"use client";

import dynamic from "next/dynamic";
import { DashboardChartsSkeleton } from "@/app/_components/dashboard-charts-skeleton";
import {
  BreakdownDatum,
  WeeklyApplicationCount,
} from "@/lib/applications";

type LazyDashboardChartsProps = {
  weeklyApplications: WeeklyApplicationCount[];
  statusBreakdown: BreakdownDatum[];
  locationBreakdown: BreakdownDatum[];
  selectedTimeframe: "6" | "12" | "24" | "all";
  onTimeframeChange: (timeframe: "6" | "12" | "24" | "all") => void;
};

const DashboardCharts = dynamic(
  () =>
    import("@/app/_components/dashboard-charts").then(
      (module) => module.DashboardCharts,
    ),
  {
    ssr: false,
    loading: () => <DashboardChartsSkeleton />,
  },
);

export function LazyDashboardCharts(props: LazyDashboardChartsProps) {
  return <DashboardCharts {...props} />;
}
