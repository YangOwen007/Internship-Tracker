import {
  dashboardMetrics,
  sampleApplications,
  statusColors,
  statusLabels,
  statuses,
  weeklyApplications,
} from "@/lib/applications";

function formatDate(value: string | null) {
  if (!value) {
    return "No deadline";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

const pipelineStatuses = statuses.filter(
  (status) => !["archived", "rejected"].includes(status),
);

const statusTotals = Object.fromEntries(
  statuses.map((status) => [
    status,
    sampleApplications.filter((application) => application.status === status),
  ]),
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

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="panel overflow-hidden rounded-[2rem]">
        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.3fr_0.9fr] lg:px-10 lg:py-10">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow rounded-full bg-white/70 px-3 py-1 text-xs">
                Internship Tracker MVP
              </span>
              <span className="rounded-full bg-slate-900 px-3 py-1 font-mono text-xs text-white">
                Full-stack portfolio direction
              </span>
            </div>
            <div className="max-w-3xl space-y-4">
              <p className="eyebrow text-xs">Student recruiting, organized like a product</p>
              <h1 className="text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                A serious internship tracker that feels closer to a recruiting CRM than a class CRUD app.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                This first slice is intentionally product-shaped: analytics at the top, pipeline
                visibility in the middle, and application-level detail below. It sets up the
                exact surface area we can wire to Prisma, Auth.js, and PostgreSQL next.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                href="#dashboard"
              >
                Explore dashboard
              </a>
              <a
                className="rounded-full border border-slate-300 bg-white/80 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-white"
                href="#applications"
              >
                Review application table
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,243,236,0.95))] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow text-xs">MVP scope</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950">
                  Recommended stack
                </h2>
              </div>
              <div className="metric-ring flex h-16 w-16 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-950">
                v1
              </div>
            </div>
            <ul className="mt-6 grid gap-3 text-sm text-slate-700">
              <li className="rounded-2xl bg-white/90 px-4 py-3">
                Next.js App Router + TypeScript for a modern full-stack React architecture.
              </li>
              <li className="rounded-2xl bg-white/90 px-4 py-3">
                Tailwind CSS with a custom visual system instead of generic starter styling.
              </li>
              <li className="rounded-2xl bg-white/90 px-4 py-3">
                Prisma + PostgreSQL next for typed persistence, migrations, and recruiter-grade data modeling.
              </li>
              <li className="rounded-2xl bg-white/90 px-4 py-3">
                Auth.js next for user-specific data, protected routes, and a realistic SaaS workflow.
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

        <article className="panel rounded-[1.5rem] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow text-xs">Analytics preview</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Applications over time
              </h2>
            </div>
            <span className="rounded-full bg-white px-3 py-1 font-mono text-xs text-slate-600">
              last 6 weeks
            </span>
          </div>
          <div className="mt-8 flex h-64 items-end justify-between gap-3">
            {weeklyApplications.map((entry) => (
              <div key={entry.label} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-full w-full items-end">
                  <div
                    className="w-full rounded-t-[1.25rem] bg-[linear-gradient(180deg,#2f7df6_0%,#7fb0fb_100%)]"
                    style={{ height: `${entry.value * 14}%` }}
                  />
                </div>
                <div className="text-center">
                  <p className="font-mono text-xs text-slate-500">{entry.label}</p>
                  <p className="mt-1 text-sm font-medium text-slate-700">{entry.value} apps</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <article className="panel rounded-[1.5rem] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow text-xs">Pipeline view</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Recruiting flow
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              This is the shape we&apos;ll keep when we replace sample data with user-specific records
              from PostgreSQL.
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

        <article className="panel rounded-[1.5rem] p-5">
          <p className="eyebrow text-xs">What this project can show recruiters</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Why this MVP is strong
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
            <div className="rounded-2xl bg-white/85 p-4">
              Typed application records already mirror the fields a real schema needs:
              statuses, deadlines, contacts, resume versions, and notes.
            </div>
            <div className="rounded-2xl bg-white/85 p-4">
              The dashboard is analytics-first, which makes the project feel operational and
              product-minded instead of just a forms exercise.
            </div>
            <div className="rounded-2xl bg-white/85 p-4">
              Next steps are obvious and credible: persistence, auth, forms, filters, and charts
              on top of this exact information architecture.
            </div>
          </div>
        </article>
      </section>

      <section id="applications" className="panel rounded-[1.5rem] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow text-xs">Applications</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Table view with recruiter-style context
            </h2>
          </div>
          <div className="rounded-full border border-slate-200 bg-white/85 px-4 py-2 font-mono text-xs text-slate-600">
            Search, filters, and sorting will plug in here next
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200">
          <div className="hidden grid-cols-[1.1fr_1.4fr_0.8fr_0.9fr_1.2fr_1.4fr] gap-3 bg-slate-100/80 px-4 py-3 text-xs font-medium uppercase tracking-[0.12em] text-slate-500 md:grid">
            <span>Company</span>
            <span>Role</span>
            <span>Status</span>
            <span>Deadline</span>
            <span>Contact</span>
            <span>Notes</span>
          </div>

          <div className="divide-y divide-slate-200 bg-white/90">
            {sampleApplications.map((application) => (
              <div
                key={application.id}
                className="grid gap-3 px-4 py-4 md:grid-cols-[1.1fr_1.4fr_0.8fr_0.9fr_1.2fr_1.4fr] md:items-start"
              >
                <div>
                  <p className="font-semibold text-slate-900">{application.company}</p>
                  <a
                    className="mt-1 inline-block text-sm text-slate-500 underline decoration-slate-300 underline-offset-4"
                    href={application.jobLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Job posting
                  </a>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800">{application.role}</p>
                  <p className="mt-1 text-sm text-slate-500">{application.location}</p>
                  <p className="mt-2 font-mono text-xs text-slate-500">
                    {application.resumeVersion}
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusColors[application.status]}`}
                  >
                    {statusLabels[application.status]}
                  </span>
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
          </div>
        </div>
      </section>
    </main>
  );
}
