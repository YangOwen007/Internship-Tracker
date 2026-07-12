"use client";

import Link from "next/link";
import {
  ApplicationRecord,
  formatDate,
  statusChartColors,
  statusColors,
  statusLabels,
} from "@/lib/applications";

type BoardColumnProps = {
  status: ApplicationRecord["status"];
  applications: ApplicationRecord[];
  isPending: boolean;
  onMoveApplication: (
    applicationId: string,
    nextStatus: ApplicationRecord["status"],
  ) => void;
};

function DraggableCard({
  application,
  isPending,
}: {
  application: ApplicationRecord;
  isPending: boolean;
}) {
  return (
    <article
      draggable={!isPending}
      onDragStart={(event) => {
        event.dataTransfer.setData(
          "application/json",
          JSON.stringify({
            applicationId: application.id,
            fromStatus: application.status,
          }),
        );
        event.dataTransfer.effectAllowed = "move";
      }}
      className={`app-card rounded-[1.35rem] border border-slate-200 bg-white/92 p-4 shadow-[0_10px_22px_rgba(24,33,47,0.05)] transition ${
        isPending ? "opacity-70" : "cursor-grab active:cursor-grabbing"
      }`}
    >
      {/* These cards support drag-and-drop now, but still keep links and notes visible
          so the feature stays practical even before we add richer editing later. */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-950">
            {application.company}
          </p>
          <p className="mt-1 text-sm text-slate-600">{application.role}</p>
        </div>
        <p className="font-mono text-[11px] text-slate-500">
          {formatDate(application.nextDeadline)}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
        <span className="rounded-full bg-slate-100 px-2.5 py-1">
          {application.location}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1">
          Applied {formatDate(application.appliedAt)}
        </span>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
        {application.notes}
      </p>

      {application.tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {application.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-[11px] text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        <Link
          href={`/applications/${application.id}/edit`}
          className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-4"
        >
          Edit details
        </Link>
        <a
          href={application.jobLink}
          target="_blank"
          rel="noreferrer"
          className="text-slate-500 underline decoration-slate-300 underline-offset-4"
        >
          Open posting
        </a>
      </div>
    </article>
  );
}

export function BoardColumn({
  status,
  applications,
  isPending,
  onMoveApplication,
}: BoardColumnProps) {
  const visibleApplications = applications;

  return (
    <section
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }}
      onDrop={(event) => {
        event.preventDefault();

        const rawPayload = event.dataTransfer.getData("application/json");

        if (!rawPayload) {
          return;
        }

        const payload = JSON.parse(rawPayload) as {
          applicationId?: string;
          fromStatus?: ApplicationRecord["status"];
        };

        if (!payload.applicationId || payload.fromStatus === status) {
          return;
        }

        onMoveApplication(payload.applicationId, status);
      }}
      className="app-column rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,243,236,0.92))] p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: statusChartColors[status] }}
          />
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[status]}`}>
            {statusLabels[status]}
          </span>
        </div>
        <span className="font-mono text-xs text-slate-500">
          {visibleApplications.length}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {visibleApplications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 px-4 py-6 text-center text-sm text-slate-500">
            Drop an application here.
          </div>
        ) : (
          visibleApplications.map((application) => (
            <DraggableCard
              key={application.id}
              application={application}
              isPending={isPending}
            />
          ))
        )}
      </div>
    </section>
  );
}
