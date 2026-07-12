import Link from "next/link";
import { statusLabels, statuses } from "@/lib/applications";

type ApplicationFiltersProps = {
  locations: string[];
  initialSearch: string;
  initialStatus: string;
  initialLocation: string;
  initialSort: string;
  initialView: string;
};

// This filter form uses GET params instead of client state so it stays simple:
// the URL always reflects the current table view, which makes refresh and sharing easier.
export function ApplicationFilters({
  locations,
  initialSearch,
  initialStatus,
  initialLocation,
  initialSort,
  initialView,
}: ApplicationFiltersProps) {
  return (
    <form className="grid gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
      <input type="hidden" name="view" value={initialView} />
      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
          Search
        </span>
        <input
          name="search"
          defaultValue={initialSearch}
          placeholder="Company or role"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
          Status
        </span>
        <select
          name="status"
          defaultValue={initialStatus}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
        >
          <option value="">All statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
          Location
        </span>
        <select
          name="location"
          defaultValue={initialLocation}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
        >
          <option value="">All locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
          Sort
        </span>
        <select
          name="sort"
          defaultValue={initialSort}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
        >
          <option value="newest">Newest applied</option>
          <option value="oldest">Oldest applied</option>
          <option value="company_asc">Company A-Z</option>
          <option value="company_desc">Company Z-A</option>
          <option value="deadline_asc">Soonest deadline</option>
        </select>
      </label>

      <div className="flex items-end gap-3">
        <button
          type="submit"
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Apply
        </button>
        <Link
          href="/"
          className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400"
        >
          Clear
        </Link>
      </div>
    </form>
  );
}
