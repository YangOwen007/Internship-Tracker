type ApplicationViewToggleProps = {
  currentView: "board" | "table";
  onChange: (view: "board" | "table") => void;
};

export function ApplicationViewToggle(props: ApplicationViewToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-slate-100/80 p-1">
      {(["board", "table"] as const).map((view) => {
        const isActive = props.currentView === view;

        return (
          <button
            key={view}
            type="button"
            onClick={() => props.onChange(view)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {view === "board" ? "Board view" : "Table view"}
          </button>
        );
      })}
    </div>
  );
}
