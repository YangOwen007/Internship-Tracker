import { ApplicationStatus as PrismaApplicationStatus } from "@/generated/prisma/client";
import {
  BreakdownDatum,
  ApplicationRecord,
  getDashboardMetrics,
  PriorityApplication,
  statusChartColors,
  statusLabels,
  statuses,
  WeeklyApplicationCount,
} from "@/lib/applications";
import { prisma } from "@/lib/prisma";

function toDateString(value: Date | null) {
  return value ? value.toISOString().slice(0, 10) : null;
}

function mapStatus(status: PrismaApplicationStatus): ApplicationRecord["status"] {
  switch (status) {
    case PrismaApplicationStatus.INTERESTED:
      return "interested";
    case PrismaApplicationStatus.APPLIED:
      return "applied";
    case PrismaApplicationStatus.OA:
      return "oa";
    case PrismaApplicationStatus.INTERVIEW:
      return "interview";
    case PrismaApplicationStatus.FINAL_ROUND:
      return "final_round";
    case PrismaApplicationStatus.OFFER:
      return "offer";
    case PrismaApplicationStatus.REJECTED:
      return "rejected";
    case PrismaApplicationStatus.ARCHIVED:
      return "archived";
  }
}

function getWeekStart(date: Date) {
  const weekStart = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const day = weekStart.getUTCDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  weekStart.setUTCDate(weekStart.getUTCDate() + mondayOffset);
  return weekStart;
}

function formatWeekLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(date);
}

function buildWeeklyApplications(
  applications: ApplicationRecord[],
): WeeklyApplicationCount[] {
  const appliedDates = applications.map(
    (application) => new Date(`${application.appliedAt}T00:00:00Z`),
  );
  const anchorDate =
    appliedDates.length > 0
      ? new Date(Math.max(...appliedDates.map((date) => date.getTime())))
      : new Date();

  const currentWeekStart = getWeekStart(anchorDate);
  const weekStarts = Array.from({ length: 6 }, (_, index) => {
    const weekStart = new Date(currentWeekStart);
    weekStart.setUTCDate(currentWeekStart.getUTCDate() - (5 - index) * 7);
    return weekStart;
  });

  return weekStarts.map((weekStart) => {
    const weekEnd = new Date(weekStart);
    weekEnd.setUTCDate(weekStart.getUTCDate() + 7);

    const value = appliedDates.filter(
      (date) => date >= weekStart && date < weekEnd,
    ).length;

    return {
      label: formatWeekLabel(weekStart),
      value,
    };
  });
}

function buildStatusBreakdown(applications: ApplicationRecord[]): BreakdownDatum[] {
  // Keeping the breakdown logic here means the page receives ready-to-render
  // analytics data instead of rebuilding counts in multiple UI components.
  return statuses
    .map((status) => ({
      label: statusLabels[status],
      value: applications.filter((application) => application.status === status).length,
      color: statusChartColors[status],
    }))
    .filter((entry) => entry.value > 0);
}

function buildLocationBreakdown(applications: ApplicationRecord[]): BreakdownDatum[] {
  const counts = new Map<string, number>();

  for (const application of applications) {
    counts.set(
      application.location,
      (counts.get(application.location) ?? 0) + 1,
    );
  }

  return Array.from(counts.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((left, right) => {
      if (right.value !== left.value) {
        return right.value - left.value;
      }

      return left.label.localeCompare(right.label);
    })
    .slice(0, 5);
}

function buildPriorityQueue(
  applications: ApplicationRecord[],
): PriorityApplication[] {
  const now = new Date();

  return applications
    .filter(
      (application) =>
        application.status !== "offer" &&
        application.status !== "rejected" &&
        application.status !== "archived",
    )
    .map((application) => {
      const deadlineDate = application.nextDeadline
        ? new Date(`${application.nextDeadline}T00:00:00Z`)
        : null;

      let urgencyLabel = "No deadline";

      if (deadlineDate) {
        const diffInDays = Math.ceil(
          (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
        );

        if (diffInDays <= 0) {
          urgencyLabel = "Due now";
        } else if (diffInDays === 1) {
          urgencyLabel = "Due in 1 day";
        } else {
          urgencyLabel = `Due in ${diffInDays} days`;
        }
      } else if (application.status === "oa" || application.status === "interview") {
        urgencyLabel = "Follow up soon";
      }

      return {
        id: application.id,
        company: application.company,
        role: application.role,
        status: application.status,
        nextDeadline: application.nextDeadline,
        contact: application.contact,
        location: application.location,
        urgencyLabel,
        deadlineSortKey: deadlineDate?.getTime() ?? Number.POSITIVE_INFINITY,
      };
    })
    .sort((left, right) => left.deadlineSortKey - right.deadlineSortKey)
    .slice(0, 5)
    .map((application) => ({
      id: application.id,
      company: application.company,
      role: application.role,
      status: application.status,
      nextDeadline: application.nextDeadline,
      contact: application.contact,
      location: application.location,
      urgencyLabel: application.urgencyLabel,
    }));
}

export async function getDashboardData(userId: string) {
  const applications = await prisma.application.findMany({
    where: {
      userId,
    },
    orderBy: [{ appliedAt: "desc" }, { company: "asc" }],
    include: {
      contact: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  const records: ApplicationRecord[] = applications.map((application) => ({
    id: application.id,
    company: application.company,
    role: application.role,
    location: application.location,
    status: mapStatus(application.status),
    appliedAt: application.appliedAt.toISOString().slice(0, 10),
    salary: application.salary,
    jobLink: application.jobLink,
    nextDeadline: toDateString(application.nextDeadline),
    contact: application.contact
      ? {
          name: application.contact.name,
          title: application.contact.title,
          channel: application.contact.channel,
        }
      : null,
    resumeVersion: application.resumeVersion,
    tags: application.tags.map((entry) => entry.tag.name).sort(),
    notes: application.notes,
  }));

  return {
    applications: records,
    dashboardMetrics: getDashboardMetrics(records),
    locationBreakdown: buildLocationBreakdown(records),
    priorityQueue: buildPriorityQueue(records),
    statusBreakdown: buildStatusBreakdown(records),
    weeklyApplications: buildWeeklyApplications(records),
  };
}
