"use client";

import Link from "next/link";
import { ApplicationRecord, formatDate, statusColors, statusLabels } from "@/lib/applications";

type ApplicationDetailModalProps = {
  application: ApplicationRecord | null;
  onClose: () => void;
};

export function ApplicationDetailModal({
  application,
  onClose,
}: ApplicationDetailModalProps) {
  if (!application) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-detail-title"
      onClick={onClose}
    >
      <div
        className="panel max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] p-6 sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="eyebrow text-xs">Application details</p>
            <div>
              <h2
                id="application-detail-title"
                className="text-3xl font-semibold tracking-[-0.03em] text-slate-950"
              >
                {application.company}
              </h2>
              <p className="mt-2 text-base text-slate-600">
                {application.role} in {application.location}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusColors[application.status]}`}
              >
                {statusLabels[application.status]}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs text-slate-600">
                Applied {formatDate(application.appliedAt)}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs text-slate-600">
                Deadline {formatDate(application.nextDeadline)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-950"
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
              Links and docs
            </p>
            <div className="mt-3 space-y-3 text-sm text-slate-700">
              <a
                href={application.jobLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center font-medium text-[color:var(--accent-cool)] underline decoration-slate-300 underline-offset-4"
              >
                Open job posting
              </a>
              <p>Resume version: {application.resumeVersion ?? "Not set yet"}</p>
              <p>Salary: {application.salary ?? "Unknown"}</p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
              Contact
            </p>
            {application.contact ? (
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p className="font-medium text-slate-900">{application.contact.name}</p>
                <p>{application.contact.title}</p>
                <p className="font-mono text-xs text-slate-500">
                  {application.contact.channel}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                No recruiter, referral, or contact is attached yet.
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-[1.5rem] border border-slate-200 bg-white/90 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
            Notes
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {application.notes || "No notes have been added yet."}
          </p>
        </div>

        <div className="mt-4 rounded-[1.5rem] border border-slate-200 bg-white/90 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
            Tags
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {application.tags.length > 0 ? (
              application.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs text-slate-600"
                >
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">No tags yet.</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={`/applications/${application.id}/edit`}
            className="rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-medium !text-white transition-colors hover:bg-slate-800"
          >
            Edit application
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
