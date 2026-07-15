"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { updateApplicationStatus } from "@/app/applications/actions";
import {
  ApplicationRecord,
  statusColors,
  statusLabels,
  statuses,
} from "@/lib/applications";

type QuickStatusFormProps = {
  applicationId: ApplicationRecord["id"];
  currentStatus: ApplicationRecord["status"];
};

// This compact form is meant for "frequent tiny updates" like moving an
// application from Applied -> OA without opening the full edit screen.
export function QuickStatusForm({
  applicationId,
  currentStatus,
}: QuickStatusFormProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [optimisticStatus, setOptimisticStatus] = useState<
    ApplicationRecord["status"] | null
  >(null);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const displayedStatus = optimisticStatus ?? currentStatus;

  async function handleStatusChange(nextStatus: ApplicationRecord["status"]) {
    const formData = new FormData();
    formData.set("status", nextStatus);

    setErrorMessage(null);
    setOptimisticStatus(nextStatus);
    setIsEditing(false);

    startTransition(async () => {
      try {
        await updateApplicationStatus(applicationId, formData);
        router.refresh();
      } catch {
        // If the server update fails, we roll the label back so the UI
        // still reflects the saved state instead of a misleading optimistic one.
        setOptimisticStatus(null);
        setIsEditing(true);
        setErrorMessage("Status update failed. Try again.");
      }
    });
  }

  if (!isEditing) {
    return (
      <div className="mt-3">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          disabled={isPending}
          className={`rounded-full px-3 py-2 text-xs font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 ${statusColors[displayedStatus]}`}
          aria-label="Edit application status"
        >
          {statusLabels[displayedStatus]}
        </button>
        {errorMessage ? (
          <p className="mt-2 text-xs text-rose-700" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mt-3">
      <label className="sr-only" htmlFor={`status-${applicationId}`}>
        Update application status
      </label>
      <select
        id={`status-${applicationId}`}
        autoFocus
        value={displayedStatus}
        onChange={(event) =>
          handleStatusChange(event.target.value as ApplicationRecord["status"])
        }
        onBlur={() => setIsEditing(false)}
        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none transition focus:border-slate-400"
        disabled={isPending}
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {statusLabels[status]}
          </option>
        ))}
      </select>
    </div>
  );
}
