import Link from "next/link";

type ApplicationViewToggleProps = {
  search: string;
  status: string;
  location: string;
  sort: string;
  currentView: "board" | "table";
};

function buildHref({
  search,
  status,
  location,
  sort,
  view,
}: ApplicationViewToggleProps & { view: "board" | "table" }) {
  const params = new URLSearchParams();

  // We keep the current filters when switching views so the user is changing
  // presentation, not accidentally resetting the slice of data they care about.
  if (search) {
    params.set("search", search);
  }
  if (status) {
    params.set("status", status);
  }
  if (location) {
    params.set("location", location);
  }
  if (sort && sort !== "newest") {
    params.set("sort", sort);
  }
  if (view !== "table") {
    params.set("view", view);
  }

  const query = params.toString();
  return query.length > 0 ? `/?${query}#applications` : "/#applications";
}

export function ApplicationViewToggle(props: ApplicationViewToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-slate-100/80 p-1">
      {(["board", "table"] as const).map((view) => {
        const isActive = props.currentView === view;

        return (
          <Link
            key={view}
            href={buildHref({ ...props, view })}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {view === "board" ? "Board view" : "Table view"}
          </Link>
        );
      })}
    </div>
  );
}
