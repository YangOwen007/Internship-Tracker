"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { ApplicationBoard } from "@/app/_components/application-board";
import { ApplicationDetailModal } from "@/app/_components/application-detail-modal";
import { ApplicationFilters } from "@/app/_components/application-filters";
import { ApplicationViewToggle } from "@/app/_components/application-view-toggle";
import { LazyDashboardCharts } from "@/app/_components/lazy-dashboard-charts";
import { PriorityQueue } from "@/app/_components/priority-queue";
import { QuickStatusForm } from "@/app/applications/_components/quick-status-form";
import {
  ApplicationRecord,
  ApplicationStatus,
  BreakdownDatum,
  buildWeeklyApplications,
  DashboardMetrics,
  filterApplications,
  formatDate,
  sortApplications,
  statusColors,
  statusLabels,
  statuses,
} from "@/lib/applications";

type DashboardShellProps = {
  applications: ApplicationRecord[];
  dashboardMetrics: DashboardMetrics;
  locationBreakdown: BreakdownDatum[];
  priorityQueue: Array<{
    id: string;
    company: string;
    role: string;
    status: ApplicationStatus;
    nextDeadline: string | null;
    contact: {
      name: string;
      title: string;
      channel: string;
    } | null;
    location: string;
    urgencyLabel: string;
  }>;
  statusBreakdown: BreakdownDatum[];
};

const pipelineStatuses = statuses.filter(
  (status) => !["archived", "rejected"].includes(status),
);

export function DashboardShell({
  applications,
  dashboardMetrics,
  locationBreakdown,
  priorityQueue,
  statusBreakdown,
}: DashboardShellProps) {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedView, setSelectedView] = useState<"board" | "table">("table");
  const [selectedTimeframe, setSelectedTimeframe] = useState<"6" | "12" | "24" | "all">("6");
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const deferredSearch = useDeferredValue(search);

  // Keeping filter state on the client lets the workspace update instantly
  // instead of forcing the whole page through a server round-trip.
  const filteredApplications = sortApplications(
    filterApplications(
      applications,
      deferredSearch,
      selectedStatus,
      selectedLocation,
    ),
    selectedSort,
  );
  const selectedApplication =
    applications.find((application) => application.id === selectedApplicationId) ??
    null;
  const availableLocations = Array.from(
    new Set(applications.map((application) => application.location)),
  ).sort((left, right) => left.localeCompare(right));
  const statusTotals = Object.fromEntries(
    statuses.map((status) => [
      status,
      filteredApplications.filter((application) => application.status === status),
    ]),
  ) as Record<ApplicationStatus, ApplicationRecord[]>;
  const weeklyApplications = buildWeeklyApplications(
    applications,
    selectedTimeframe === "all" ? "all" : Number(selectedTimeframe),
  );
  const metricCards = [
    {
      label: "Applications",
      value: dashboardMetrics.total,
      detail: `${dashboardMetrics.active} active opportunities across the pipeline`,
      accent: "var(--accent-cool)",
    },
    {
      label: "Response Rate",
      value: `${dashboardMetrics.responseRate}%`,
      detail: "Counts OA, interview progress, offers, and explicit rejections",
      accent: "var(--success)",
    },
    {
      label: "Interview Rate",
      value: `${dashboardMetrics.interviewRate}%`,
      detail: "Signal for whether targeting and resume positioning are working",
      accent: "var(--warning)",
    },
    {
      label: "Offers",
      value: `${dashboardMetrics.offerRate}%`,
      detail: `${dashboardMetrics.deadlines} upcoming deadlines and follow-ups tracked`,
      accent: "var(--accent)",
    },
  ];

  function clearFilters() {
    setSearch("");
    setSelectedStatus("");
    setSelectedLocation("");
    setSelectedSort("newest");
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <section className="panel overflow-hidden rounded-[2rem]">
          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.3fr_0.9fr] lg:px-10 lg:py-10">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow rounded-full bg-white/70 px-3 py-1 text-xs">
                  Internship Tracker MVP
                </span>
                <span className="rounded-full bg-slate-900 px-3 py-1 font-mono text-xs text-white">
                  Prisma-backed user data
                </span>
              </div>
              <div className="max-w-3xl space-y-4">
                <p className="eyebrow text-xs">Student recruiting, organized like a product</p>
                <h1 className="text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                  A serious internship tracker that feels closer to a recruiting CRM than a class CRUD app.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  The dashboard is now reading from a real database instead of a hardcoded
                  array. With authentication in place, each user now sees their own recruiting
                  pipeline and analytics.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  className="rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-medium !text-white transition-colors hover:bg-slate-800"
                  href="#applications"
                >
                  Open workspace
                </a>
                <Link
                  className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-medium text-slate-950 transition-opacity hover:opacity-90"
                  href="/applications/new"
                >
                  Add application
                </Link>
                <a
                  className="rounded-full border border-slate-300 bg-white/80 px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-white"
                  href="#dashboard"
                >
                  Review analytics
                </a>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,243,236,0.95))] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow text-xs">Backend foundation</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-950">
                    What changed
                  </h2>
                </div>
                <div className="metric-ring flex h-16 w-16 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-950">
                  DB
                </div>
              </div>
              <ul className="mt-6 grid gap-3 text-sm text-slate-700">
                <li className="rounded-2xl bg-white/90 px-4 py-3">
                  Prisma schema with internship-tracker-specific models for applications, contacts, and tags.
                </li>
                <li className="rounded-2xl bg-white/90 px-4 py-3">
                  Local SQLite database for fast iteration until we add PostgreSQL infrastructure.
                </li>
                <li className="rounded-2xl bg-white/90 px-4 py-3">
                  Seeded demo data so the UI stays explorable before you add your own records.
                </li>
                <li className="rounded-2xl bg-white/90 px-4 py-3">
                  Server-side queries in Next.js, which is the same integration style we&apos;ll keep later.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          id="dashboard"
          className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {metricCards.map((metric) => (
              <article key={metric.label} className="panel rounded-[1.5rem] p-5">
                <div
                  className="h-2 w-20 rounded-full"
                  style={{ backgroundColor: metric.accent }}
                />
                <p className="mt-5 text-sm text-slate-500">{metric.label}</p>
                <p className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
                  {metric.value}
                </p>
                <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">
                  {metric.detail}
                </p>
              </article>
            ))}
          </div>

          <LazyDashboardCharts
            weeklyApplications={weeklyApplications}
            statusBreakdown={statusBreakdown}
            locationBreakdown={locationBreakdown}
            selectedTimeframe={selectedTimeframe}
            onTimeframeChange={setSelectedTimeframe}
          />
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="panel rounded-[1.5rem] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow text-xs">Pipeline view</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  Recruiting flow
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-600">
                The layout is unchanged, but the cards below are now driven by actual database rows.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {pipelineStatuses.map((status) => (
                <div key={status} className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[status]}`}
                    >
                      {statusLabels[status]}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      {statusTotals[status].length}
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {statusTotals[status].map((application) => (
                      <div
                        key={application.id}
                        className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {application.company}
                            </p>
                            <p className="mt-1 text-sm text-slate-600">{application.role}</p>
                          </div>
                          <span className="font-mono text-xs text-slate-500">
                            {formatDate(application.nextDeadline)}
                          </span>
                        </div>
                        <p className="mt-3 text-xs leading-5 text-slate-500">
                          {application.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <PriorityQueue
            applications={priorityQueue}
            onOpenApplication={(applicationId) => setSelectedApplicationId(applicationId)}
          />
        </section>

        <section id="applications" className="panel rounded-[1.5rem] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow text-xs">Applications</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Workspace view for your recruiting pipeline
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-slate-200 bg-white/85 px-4 py-2 font-mono text-xs text-slate-600">
                {filteredApplications.length} of {applications.length} shown
              </div>
              <ApplicationViewToggle
                currentView={selectedView}
                onChange={setSelectedView}
              />
            </div>
          </div>

          <div className="mt-6">
            <ApplicationFilters
              locations={availableLocations}
              search={search}
              status={selectedStatus}
              location={selectedLocation}
              sort={selectedSort}
              onSearchChange={setSearch}
              onStatusChange={setSelectedStatus}
              onLocationChange={setSelectedLocation}
              onSortChange={setSelectedSort}
              onClear={clearFilters}
            />
          </div>

          <div className="mt-6">
            {selectedView === "board" ? (
              <ApplicationBoard applications={filteredApplications} />
            ) : (
              <div className="overflow-hidden rounded-[1.5rem] border border-slate-200">
                <div className="hidden grid-cols-[1.1fr_1.4fr_0.8fr_0.9fr_1.2fr_1.4fr] gap-3 bg-slate-100/80 px-4 py-3 text-xs font-medium uppercase tracking-[0.12em] text-slate-500 md:grid">
                  <span>Company</span>
                  <span>Role</span>
                  <span>Status</span>
                  <span>Deadline</span>
                  <span>Contact</span>
                  <span>Notes</span>
                </div>

                <div className="divide-y divide-slate-200 bg-white/90">
                  {filteredApplications.map((application) => (
                    <div
                      key={application.id}
                      className="grid gap-3 px-4 py-4 md:grid-cols-[1.1fr_1.4fr_0.8fr_0.9fr_1.2fr_1.4fr] md:items-start"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{application.company}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                          <a
                            className="text-slate-500 underline decoration-slate-300 underline-offset-4"
                            href={application.jobLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Job posting
                          </a>
                          <button
                            type="button"
                            onClick={() => setSelectedApplicationId(application.id)}
                            className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-4"
                          >
                            View details
                          </button>
                          <Link
                            className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-4"
                            href={`/applications/${application.id}/edit`}
                          >
                            Edit application
                          </Link>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-800">{application.role}</p>
                        <p className="mt-1 text-sm text-slate-500">{application.location}</p>
                        <p className="mt-2 font-mono text-xs text-slate-500">
                          {application.resumeVersion ?? "Resume version not set"}
                        </p>
                      </div>

                      <div>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusColors[application.status]}`}
                        >
                          {statusLabels[application.status]}
                        </span>
                        {/* Quick updates make the tracker usable for day-to-day recruiting
                            without forcing a full-page edit for every stage change. */}
                        <QuickStatusForm
                          applicationId={application.id}
                          currentStatus={application.status}
                        />
                      </div>

                      <div>
                        <p className="text-sm text-slate-800">{formatDate(application.nextDeadline)}</p>
                        <p className="mt-1 font-mono text-xs text-slate-500">
                          Applied {formatDate(application.appliedAt)}
                        </p>
                      </div>

                      <div>
                        {application.contact ? (
                          <>
                            <p className="text-sm font-medium text-slate-800">
                              {application.contact.name}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {application.contact.title}
                            </p>
                            <p className="mt-1 font-mono text-xs text-slate-500">
                              {application.contact.channel}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-slate-500">No contact attached yet</p>
                        )}
                      </div>

                      <div>
                        <p className="text-sm leading-6 text-slate-600">{application.notes}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {application.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredApplications.length === 0 ? (
                    <div className="px-4 py-10 text-center">
                      {/* Empty states matter because filters often fail due to user input,
                          not because the app is broken. */}
                      <p className="text-sm font-medium text-slate-700">
                        No applications matched this view.
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Try clearing one filter or broadening your search terms.
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
            {selectedView === "board" && filteredApplications.length === 0 ? (
              <div className="mt-4 rounded-[1.5rem] border border-dashed border-slate-200 bg-white/70 px-4 py-8 text-center">
                <p className="text-sm font-medium text-slate-700">
                  No applications matched this board view.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try clearing one filter or switching to a broader slice of your pipeline.
                </p>
              </div>
            ) : null}
            <div className="mt-4 rounded-[1.5rem] bg-slate-50/80 px-4 py-3 text-sm text-slate-600">
              Board view is best for moving applications through stages quickly. Table view is
              better when you want to compare details across many records at once.
            </div>
          </div>
        </section>
      </div>

      <ApplicationDetailModal
        application={selectedApplication}
        onClose={() => setSelectedApplicationId(null)}
      />
    </>
  );
}
