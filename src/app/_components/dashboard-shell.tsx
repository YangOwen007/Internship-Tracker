"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
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
  const hasApplications = applications.length > 0;

  // Keeping filter state on the client lets the workspace update instantly
  // instead of forcing the whole page through a server round-trip.
  const filteredApplications = useMemo(
    () =>
      sortApplications(
        filterApplications(
          applications,
          deferredSearch,
          selectedStatus,
          selectedLocation,
        ),
        selectedSort,
      ),
    [applications, deferredSearch, selectedLocation, selectedSort, selectedStatus],
  );
  const selectedApplication = useMemo(
    () =>
      applications.find((application) => application.id === selectedApplicationId) ??
      null,
    [applications, selectedApplicationId],
  );
  const availableLocations = useMemo(
    () =>
      Array.from(
        new Set(applications.map((application) => application.location)),
      ).sort((left, right) => left.localeCompare(right)),
    [applications],
  );
  const statusTotals = useMemo(
    () =>
      Object.fromEntries(
        statuses.map((status) => [
          status,
          filteredApplications.filter((application) => application.status === status),
        ]),
      ) as Record<ApplicationStatus, ApplicationRecord[]>,
    [filteredApplications],
  );
  const weeklyApplications = useMemo(
    () =>
      buildWeeklyApplications(
        applications,
        selectedTimeframe === "all" ? "all" : Number(selectedTimeframe),
      ),
    [applications, selectedTimeframe],
  );
  const metricCards = useMemo(
    () => [
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
    ],
    [dashboardMetrics],
  );

  function clearFilters() {
    setSearch("");
    setSelectedStatus("");
    setSelectedLocation("");
    setSelectedSort("newest");
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <section id="overview" className="panel overflow-hidden rounded-[2rem]">
          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.3fr_0.9fr] lg:px-10 lg:py-10">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow rounded-full bg-white/70 px-3 py-1 text-xs">
                  Internship search command center
                </span>
                <span className="rounded-full bg-slate-900 px-3 py-1 font-mono text-xs text-white">
                  Private workspace
                </span>
              </div>
              <div className="max-w-3xl space-y-4">
                <p className="eyebrow text-xs">Track momentum, deadlines, and next steps in one place</p>
                <h1 className="text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                  Keep your recruiting search calm, clear, and easy to act on.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Review active applications, upcoming deadlines, and the stages that need
                  attention so you always know what to do next.
                </p>
              </div>
              <div className="flex flex-wrap gap-3" data-tour-id="hero-actions">
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

            <div
              className="rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,243,236,0.95))] p-5"
              data-tour-id="quick-snapshot"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow text-xs">Quick snapshot</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-950">
                    Your search at a glance
                  </h2>
                </div>
                <div className="metric-ring flex h-16 w-16 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-950">
                  {dashboardMetrics.total}
                </div>
              </div>
              <ul className="mt-6 grid gap-3 text-sm text-slate-700">
                <li className="rounded-2xl bg-white/90 px-4 py-3">
                  {dashboardMetrics.active} active opportunities are currently moving through your pipeline.
                </li>
                <li className="rounded-2xl bg-white/90 px-4 py-3">
                  {dashboardMetrics.deadlines} upcoming deadlines or follow-ups are worth watching.
                </li>
                <li className="rounded-2xl bg-white/90 px-4 py-3">
                  Response rate is {dashboardMetrics.responseRate}% across all tracked applications.
                </li>
                <li className="rounded-2xl bg-white/90 px-4 py-3">
                  Interview rate is {dashboardMetrics.interviewRate}%, which helps you judge how your outreach is landing.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {!hasApplications ? (
          <section className="panel rounded-[1.5rem] p-5">
            {/* First-use dashboards need a real onboarding moment so the app
                still feels helpful before the user has any data to analyze. */}
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="eyebrow text-xs">Start here</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                  Add your first application to bring the tracker to life.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  Once you add a role, this dashboard will start filling in with pipeline
                  stages, deadlines, analytics, and follow-up priorities.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/applications/new"
                    className="rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-medium !text-white transition-colors hover:bg-slate-800"
                  >
                    Add your first application
                  </Link>
                  <a
                    href="#applications"
                    className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400"
                  >
                    Preview the workspace
                  </a>
                </div>
              </div>
              <div className="grid gap-3 text-sm text-slate-700">
                <div className="rounded-2xl bg-white/90 px-4 py-4">
                  Save company, role, location, links, salary, and resume version.
                </div>
                <div className="rounded-2xl bg-white/90 px-4 py-4">
                  Track stages like applied, OA, interview, final round, and offer.
                </div>
                <div className="rounded-2xl bg-white/90 px-4 py-4">
                  Add contacts, notes, and deadlines so follow-ups never slip through.
                </div>
              </div>
            </div>
          </section>
        ) : null}

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
          <article
            id="pipeline"
            className="panel rounded-[1.5rem] p-5"
            data-tour-id="pipeline-view"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow text-xs">Pipeline view</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  Recruiting flow
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-600">
                Scan each stage to see where momentum is building and where follow-up is still needed.
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

          <div id="next-actions" data-tour-id="next-actions">
            <PriorityQueue
              applications={priorityQueue}
              onOpenApplication={(applicationId) => setSelectedApplicationId(applicationId)}
            />
          </div>
        </section>

        <section id="applications" className="panel rounded-[1.5rem] p-5">
          <div
            className="flex flex-wrap items-center justify-between gap-3"
            data-tour-id="workspace-controls"
          >
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

          <div className="mt-6" data-tour-id="workspace-filters">
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

          <div className="mt-6" data-tour-id="workspace-results">
            {selectedView === "board" ? (
              <ApplicationBoard
                applications={filteredApplications}
                sort={selectedSort}
              />
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
                        No applications match these filters.
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Try clearing a filter or broadening your search terms.
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
            {selectedView === "board" && filteredApplications.length === 0 ? (
              <div className="mt-4 rounded-[1.5rem] border border-dashed border-slate-200 bg-white/70 px-4 py-8 text-center">
                <p className="text-sm font-medium text-slate-700">
                  No applications match these filters.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try clearing a filter or switching to a broader slice of your pipeline.
                </p>
              </div>
            ) : null}
            <div className="mt-4 rounded-[1.5rem] bg-slate-50/80 px-4 py-3 text-sm text-slate-600">
              Use board view when you want to move quickly between stages, and table view when
              you want to compare details across multiple applications.
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
