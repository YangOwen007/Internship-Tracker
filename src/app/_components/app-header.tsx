import Link from "next/link";
import { DashboardTour } from "@/app/_components/dashboard-tour";

type AppHeaderProps = {
  name: string;
  email: string;
};

export function AppHeader({ name, email }: AppHeaderProps) {
  const firstName = name.trim().split(/\s+/)[0] || "there";

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 pt-6 sm:px-6 lg:px-8">
      <div>
        <Link href="/" className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
          Internship Tracker
        </Link>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back, {firstName}. <span className="font-mono">{email}</span>
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-3">
        <DashboardTour showTrigger={false} />
      </div>
    </header>
  );
}
