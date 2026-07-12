export const statuses = [
  "interested",
  "applied",
  "oa",
  "interview",
  "final_round",
  "offer",
  "rejected",
  "archived",
] as const;

export type ApplicationStatus = (typeof statuses)[number];

export type ApplicationRecord = {
  id: string;
  company: string;
  role: string;
  location: string;
  status: ApplicationStatus;
  appliedAt: string;
  salary: string | null;
  jobLink: string;
  nextDeadline: string | null;
  contact: {
    name: string;
    title: string;
    channel: string;
  } | null;
  resumeVersion: string | null;
  tags: string[];
  notes: string;
};

export type WeeklyApplicationCount = {
  label: string;
  value: number;
};

export type BreakdownDatum = {
  label: string;
  value: number;
  color?: string;
};

export type PriorityApplication = Pick<
  ApplicationRecord,
  | "id"
  | "company"
  | "role"
  | "status"
  | "nextDeadline"
  | "contact"
  | "location"
> & {
  urgencyLabel: string;
};

export type DashboardMetrics = {
  total: number;
  responseRate: number;
  interviewRate: number;
  offerRate: number;
  active: number;
  deadlines: number;
};

export const statusLabels: Record<ApplicationStatus, string> = {
  interested: "Interested",
  applied: "Applied",
  oa: "OA",
  interview: "Interview",
  final_round: "Final Round",
  offer: "Offer",
  rejected: "Rejected",
  archived: "Archived",
};

export const statusColors: Record<ApplicationStatus, string> = {
  interested: "bg-slate-200 text-slate-700",
  applied: "bg-blue-100 text-blue-700",
  oa: "bg-cyan-100 text-cyan-700",
  interview: "bg-amber-100 text-amber-700",
  final_round: "bg-violet-100 text-violet-700",
  offer: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
  archived: "bg-stone-200 text-stone-700",
};

export const statusChartColors: Record<ApplicationStatus, string> = {
  interested: "#94a3b8",
  applied: "#2f7df6",
  oa: "#06b6d4",
  interview: "#f3a712",
  final_round: "#8b5cf6",
  offer: "#0f9f75",
  rejected: "#fb7185",
  archived: "#a8a29e",
};

export function formatDate(value: string | null) {
  if (!value) {
    return "No deadline";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function getDashboardMetrics(
  applications: ApplicationRecord[],
): DashboardMetrics {
  const total = applications.length;

  if (total === 0) {
    return {
      total: 0,
      responseRate: 0,
      interviewRate: 0,
      offerRate: 0,
      active: 0,
      deadlines: 0,
    };
  }

  const responseStatuses: ApplicationStatus[] = [
    "oa",
    "interview",
    "final_round",
    "offer",
    "rejected",
  ];
  const interviewStatuses: ApplicationStatus[] = [
    "interview",
    "final_round",
    "offer",
  ];
  const activeStatuses: ApplicationStatus[] = [
    "interested",
    "applied",
    "oa",
    "interview",
    "final_round",
  ];

  const responses = applications.filter((application) =>
    responseStatuses.includes(application.status),
  ).length;
  const interviews = applications.filter((application) =>
    interviewStatuses.includes(application.status),
  ).length;
  const offers = applications.filter(
    (application) => application.status === "offer",
  ).length;
  const active = applications.filter((application) =>
    activeStatuses.includes(application.status),
  ).length;
  const deadlines = applications.filter(
    (application) => application.nextDeadline !== null,
  ).length;

  return {
    total,
    responseRate: Math.round((responses / total) * 100),
    interviewRate: Math.round((interviews / total) * 100),
    offerRate: Math.round((offers / total) * 100),
    active,
    deadlines,
  };
}
