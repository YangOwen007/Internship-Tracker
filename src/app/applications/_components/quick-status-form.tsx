"use client";

import { useEffect, useState, useTransition } from "react";
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
  const [isEditing, setIsEditing] = useState(false);
  const [optimisticStatus, setOptimisticStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setOptimisticStatus(currentStatus);
  }, [currentStatus]);

  async function handleStatusChange(nextStatus: ApplicationRecord["status"]) {
    const previousStatus = optimisticStatus;
    const formData = new FormData();
    formData.set("status", nextStatus);

    setOptimisticStatus(nextStatus);
    setIsEditing(false);

    startTransition(async () => {
      try {
        await updateApplicationStatus(applicationId, formData);
      } catch (error) {
        // If the server update fails, we roll the label back so the UI
        // still reflects the saved state instead of a misleading optimistic one.
        setOptimisticStatus(previousStatus);
        setIsEditing(true);
        throw error;
      }
    });
  }

  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        disabled={isPending}
        className={`mt-3 rounded-full px-3 py-2 text-xs font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 ${statusColors[optimisticStatus]}`}
        aria-label="Edit application status"
      >
        {statusLabels[optimisticStatus]}
      </button>
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
        value={optimisticStatus}
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
