import { AppHeader } from "@/app/_components/app-header";
import { DashboardTour } from "@/app/_components/dashboard-tour";
import { DashboardShell } from "@/app/_components/dashboard-shell";
import { QuickJumpMenu } from "@/app/_components/quick-jump-menu";
import { getDashboardData } from "@/lib/application-data";
import { requireCurrentUser } from "@/lib/auth-user";

export default async function Home() {
  const user = await requireCurrentUser();
  const dashboardData = await getDashboardData(user.id);

  return (
    <main className="flex flex-1 flex-col gap-6 pb-6">
      <QuickJumpMenu />
      <AppHeader
        name={user.name ?? "Student recruiter"}
        email={user.email}
      />
      <DashboardTour
        initialTutorialState={user.tutorialState}
        showTrigger={false}
      />
      <DashboardShell {...dashboardData} />
    </main>
  );
}
