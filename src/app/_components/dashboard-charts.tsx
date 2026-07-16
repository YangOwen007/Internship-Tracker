"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BreakdownDatum,
  WeeklyApplicationCount,
} from "@/lib/applications";

type DashboardChartsProps = {
  weeklyApplications: WeeklyApplicationCount[];
  statusBreakdown: BreakdownDatum[];
  locationBreakdown: BreakdownDatum[];
  selectedTimeframe: "6" | "12" | "24" | "all";
  onTimeframeChange: (timeframe: "6" | "12" | "24" | "all") => void;
};

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: { label?: string } }>;
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 text-xs text-slate-700 shadow-lg">
      <p className="font-mono text-slate-500">{label ?? payload[0]?.payload?.label}</p>
      <p className="mt-1 font-medium text-slate-900">{payload[0]?.value ?? 0} applications</p>
    </div>
  );
}

export function DashboardCharts({
  weeklyApplications,
  statusBreakdown,
  locationBreakdown,
  selectedTimeframe,
  onTimeframeChange,
}: DashboardChartsProps) {
  return (
    <>
      <article
        className="panel rounded-[1.5rem] p-5"
        data-tour-id="analytics-overview"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow text-xs">Application trends</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Applications over time
            </h2>
          </div>
          <label className="rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-xs text-slate-600">
            <span className="mr-2">timeframe</span>
            <select
              value={selectedTimeframe}
              onChange={(event) =>
                onTimeframeChange(
                  event.target.value as "6" | "12" | "24" | "all",
                )
              }
              className="bg-transparent outline-none"
            >
              <option value="6">6 weeks</option>
              <option value="12">12 weeks</option>
              <option value="24">24 weeks</option>
              <option value="all">all time</option>
            </select>
          </label>
        </div>

        {/* Recharts gives us real axes, tooltips, and responsive resizing, which
            makes the dashboard feel much closer to a production analytics surface. */}
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={weeklyApplications}
              margin={{ top: 10, right: 6, left: -18, bottom: 0 }}
            >
              <defs>
                <linearGradient id="applicationsArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2f7df6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#2f7df6" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(24, 33, 47, 0.08)" vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6f7b8f", fontSize: 12 }}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6f7b8f", fontSize: 12 }}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ stroke: "#cbd5e1" }}
                isAnimationActive={false}
                wrapperStyle={{ transition: "none", pointerEvents: "none" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2f7df6"
                strokeWidth={3}
                fill="url(#applicationsArea)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="panel rounded-[1.5rem] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow text-xs">Pipeline breakdown</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Statuses and top locations
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-slate-600">
            Spot where your applications are concentrated so you can balance roles, locations, and momentum.
          </p>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white/85 p-4">
            <p className="text-sm font-medium text-slate-700">Pipeline mix</p>
            <div className="mt-4 h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusBreakdown}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={52}
                    outerRadius={84}
                    paddingAngle={3}
                    isAnimationActive={false}
                  >
                    {statusBreakdown.map((entry) => (
                      <Cell key={entry.label} fill={entry.color ?? "#94a3b8"} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={<ChartTooltip />}
                    isAnimationActive={false}
                    wrapperStyle={{ transition: "none", pointerEvents: "none" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid gap-2">
              {statusBreakdown.map((entry) => (
                <div key={entry.label} className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span>{entry.label}</span>
                  </div>
                  <span className="font-mono text-slate-900">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white/85 p-4">
            <p className="text-sm font-medium text-slate-700">Top locations</p>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={locationBreakdown}
                  layout="vertical"
                  margin={{ top: 8, right: 12, left: 12, bottom: 0 }}
                >
                  <CartesianGrid stroke="rgba(24, 33, 47, 0.08)" horizontal={false} />
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#6f7b8f", fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    width={96}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#334155", fontSize: 12 }}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ fill: "rgba(47, 125, 246, 0.06)" }}
                    isAnimationActive={false}
                    wrapperStyle={{ transition: "none", pointerEvents: "none" }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[999, 999, 999, 999]}
                    fill="#ff7a59"
                    barSize={18}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
