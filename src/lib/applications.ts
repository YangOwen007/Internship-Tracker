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
  salary: string;
  jobLink: string;
  nextDeadline: string | null;
  contact: {
    name: string;
    title: string;
    channel: string;
  } | null;
  resumeVersion: string;
  tags: string[];
  notes: string;
};

export const sampleApplications: ApplicationRecord[] = [
  {
    id: "app_1",
    company: "Figma",
    role: "Software Engineer Intern",
    location: "San Francisco, CA",
    status: "interview",
    appliedAt: "2026-06-11",
    salary: "$52/hr",
    jobLink: "https://www.figma.com/careers/",
    nextDeadline: "2026-07-12",
    contact: {
      name: "Maya Chen",
      title: "University Recruiter",
      channel: "Referral",
    },
    resumeVersion: "Resume v4 - product engineering",
    tags: ["frontend", "design-tools"],
    notes: "Strong fit. Mentioned dashboard project and ownership on AI tooling experiments.",
  },
  {
    id: "app_2",
    company: "Ramp",
    role: "Software Engineering Intern",
    location: "New York, NY",
    status: "oa",
    appliedAt: "2026-06-20",
    salary: "$60/hr",
    jobLink: "https://ramp.com/careers",
    nextDeadline: "2026-07-10",
    contact: {
      name: "Jordan Patel",
      title: "Campus Recruiter",
      channel: "LinkedIn",
    },
    resumeVersion: "Resume v5 - backend emphasis",
    tags: ["fintech", "backend"],
    notes: "OA window closes soon. Prioritize finishing with clean explanations in comments.",
  },
  {
    id: "app_3",
    company: "Notion",
    role: "Product Engineering Intern",
    location: "Remote",
    status: "applied",
    appliedAt: "2026-06-25",
    salary: "Unknown",
    jobLink: "https://www.notion.so/careers",
    nextDeadline: null,
    contact: null,
    resumeVersion: "Resume v4 - product engineering",
    tags: ["product", "full-stack"],
    notes: "Need a better cover letter template tied to product intuition and developer empathy.",
  },
  {
    id: "app_4",
    company: "Datadog",
    role: "Software Engineer Intern",
    location: "Boston, MA",
    status: "final_round",
    appliedAt: "2026-05-29",
    salary: "$57/hr",
    jobLink: "https://careers.datadoghq.com",
    nextDeadline: "2026-07-15",
    contact: {
      name: "Ari Green",
      title: "Engineer Interviewer",
      channel: "Email",
    },
    resumeVersion: "Resume v5 - backend emphasis",
    tags: ["infra", "observability"],
    notes: "Prepare two scaling stories and one debugging story with measurable impact.",
  },
  {
    id: "app_5",
    company: "Vercel",
    role: "Frontend Engineer Intern",
    location: "Hybrid",
    status: "interested",
    appliedAt: "2026-07-04",
    salary: "Unknown",
    jobLink: "https://vercel.com/careers",
    nextDeadline: "2026-07-18",
    contact: null,
    resumeVersion: "Resume v4 - product engineering",
    tags: ["frontend", "platform"],
    notes: "Target after polishing this tracker and README screenshots.",
  },
  {
    id: "app_6",
    company: "Palantir",
    role: "Forward Deployed Software Engineer Intern",
    location: "Palo Alto, CA",
    status: "rejected",
    appliedAt: "2026-05-14",
    salary: "$56/hr",
    jobLink: "https://www.palantir.com/careers/",
    nextDeadline: null,
    contact: null,
    resumeVersion: "Resume v3 - general SWE",
    tags: ["systems", "mission-driven"],
    notes: "Good reminder to tailor impact bullets earlier in the cycle.",
  },
  {
    id: "app_7",
    company: "Anthropic",
    role: "Applied AI Engineering Intern",
    location: "San Francisco, CA",
    status: "offer",
    appliedAt: "2026-04-30",
    salary: "$70/hr",
    jobLink: "https://www.anthropic.com/careers",
    nextDeadline: "2026-07-16",
    contact: {
      name: "Sofia Ramirez",
      title: "Recruiting Coordinator",
      channel: "Email",
    },
    resumeVersion: "Resume v6 - AI systems",
    tags: ["ai", "ml-systems"],
    notes: "Offer in hand. Useful benchmark for what stories resonated across the loop.",
  },
  {
    id: "app_8",
    company: "Canva",
    role: "Software Engineer Intern",
    location: "Remote",
    status: "archived",
    appliedAt: "2026-03-12",
    salary: "Unknown",
    jobLink: "https://www.canva.com/careers/",
    nextDeadline: null,
    contact: null,
    resumeVersion: "Resume v2 - generalist",
    tags: ["design-tools"],
    notes: "Archived because the cycle closed before follow-up. Keep for analytics history.",
  },
];

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

const weeklyCountsSource = [
  ["Jun 02", 2],
  ["Jun 09", 3],
  ["Jun 16", 5],
  ["Jun 23", 4],
  ["Jun 30", 6],
  ["Jul 07", 3],
] as const;

export const weeklyApplications = weeklyCountsSource.map(([label, value]) => ({
  label,
  value,
}));

export const dashboardMetrics = (() => {
  const total = sampleApplications.length;
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

  const responses = sampleApplications.filter((application) =>
    responseStatuses.includes(application.status),
  ).length;
  const interviews = sampleApplications.filter((application) =>
    interviewStatuses.includes(application.status),
  ).length;
  const offers = sampleApplications.filter(
    (application) => application.status === "offer",
  ).length;
  const active = sampleApplications.filter((application) =>
    activeStatuses.includes(application.status),
  ).length;
  const deadlines = sampleApplications.filter(
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
})();
