export function DashboardChartsSkeleton() {
  return (
    <div className="grid gap-4">
      <article className="panel rounded-[1.5rem] p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow text-xs">Analytics preview</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Applications over time
            </h2>
          </div>
          <span className="rounded-full bg-white px-3 py-1 font-mono text-xs text-slate-600">
            loading
          </span>
        </div>
        <div className="mt-6 h-72 animate-pulse rounded-[1.5rem] bg-slate-100/80" />
      </article>

      <article className="panel rounded-[1.5rem] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow text-xs">Breakdown view</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Statuses and top locations
            </h2>
          </div>
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="h-72 animate-pulse rounded-[1.5rem] bg-slate-100/80" />
          <div className="h-72 animate-pulse rounded-[1.5rem] bg-slate-100/80" />
        </div>
      </article>
    </div>
  );
}
