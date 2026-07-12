import { statusLabels, statuses } from "@/lib/applications";

type ApplicationFiltersProps = {
  locations: string[];
  search: string;
  status: string;
  location: string;
  sort: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClear: () => void;
};

export function ApplicationFilters({
  locations,
  search,
  status,
  location,
  sort,
  onSearchChange,
  onStatusChange,
  onLocationChange,
  onSortChange,
  onClear,
}: ApplicationFiltersProps) {
  return (
    <div className="grid gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
          Search
        </span>
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Company or role"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-slate-400"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
          Status
        </span>
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-slate-400"
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
          value={location}
          onChange={(event) => onLocationChange(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-slate-400"
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
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-slate-400"
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
          type="button"
          onClick={onClear}
          className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
