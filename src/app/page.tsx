import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AppHeader } from "@/app/_components/app-header";
import { DashboardShell } from "@/app/_components/dashboard-shell";
import { authOptions } from "@/lib/auth";
import { getDashboardData } from "@/lib/application-data";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const dashboardData = await getDashboardData(session.user.id);

  return (
    <main className="flex flex-1 flex-col gap-6 pb-6">
      <AppHeader
        name={session.user.name ?? "Student recruiter"}
        email={session.user.email ?? "unknown@example.com"}
      />
      <DashboardShell {...dashboardData} />
    </main>
  );
}
