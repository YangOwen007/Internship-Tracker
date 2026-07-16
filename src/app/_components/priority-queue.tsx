import {
  formatDate,
  PriorityApplication,
  statusColors,
  statusLabels,
} from "@/lib/applications";

type PriorityQueueProps = {
  applications: PriorityApplication[];
  onOpenApplication: (applicationId: string) => void;
};

export function PriorityQueue({
  applications,
  onOpenApplication,
}: PriorityQueueProps) {
  return (
    <article className="panel rounded-[1.5rem] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow text-xs">Next actions</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Focus on what matters today
          </h2>
        </div>
        <span className="rounded-full bg-white px-3 py-1 font-mono text-xs text-slate-600">
          top 5 by urgency
        </span>
      </div>

      <div className="mt-6 grid gap-3">
        {applications.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-white/70 px-4 py-8 text-center text-sm text-slate-500">
            You&apos;re caught up for now. New deadlines and active interview stages will show up here automatically.
          </div>
        ) : (
          applications.map((application) => (
            <div
              key={application.id}
              className="rounded-[1.5rem] border border-slate-200 bg-white/88 p-4"
            >
              {/* This queue is intentionally compact: enough context to pick the next
                  task, but not so much detail that it competes with the board or table. */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    {application.company}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {application.role} - {application.location}
                  </p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 font-mono text-xs text-amber-700">
                  {application.urgencyLabel}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[application.status]}`}
                >
                  {statusLabels[application.status]}
                </span>
                <span className="font-mono text-xs text-slate-500">
                  Deadline {formatDate(application.nextDeadline)}
                </span>
              </div>

              {application.contact ? (
                <p className="mt-3 text-sm text-slate-500">
                  Contact: {application.contact.name} ({application.contact.channel})
                </p>
              ) : null}

              <button
                type="button"
                onClick={() => onOpenApplication(application.id)}
                className="mt-3 inline-block text-left text-sm font-medium text-slate-700 underline decoration-slate-300 underline-offset-4"
              >
                Open application
              </button>
            </div>
          ))
        )}
      </div>
    </article>
  );
}
