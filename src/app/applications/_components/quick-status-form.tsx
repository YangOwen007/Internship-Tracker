import { updateApplicationStatus } from "@/app/applications/actions";
import {
  ApplicationRecord,
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
  return (
    <form
      action={updateApplicationStatus.bind(null, applicationId)}
      className="mt-3 flex flex-wrap items-center gap-2"
    >
      <label className="sr-only" htmlFor={`status-${applicationId}`}>
        Update application status
      </label>
      <select
        id={`status-${applicationId}`}
        name="status"
        defaultValue={currentStatus}
        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none transition focus:border-slate-400"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {statusLabels[status]}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-full border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-400 hover:bg-white"
      >
        Update
      </button>
    </form>
  );
}
