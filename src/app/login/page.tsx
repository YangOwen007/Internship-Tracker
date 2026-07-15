import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { LoginForm } from "@/app/login/_components/login-form";
import { authOptions } from "@/lib/auth";
import { sanitizeCallbackPath } from "@/lib/security";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
    registered?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    redirect("/");
  }

  const params = await searchParams;
  const callbackUrl = sanitizeCallbackPath(params.callbackUrl);
  const showRegisteredMessage = params.registered === "1";

  return (
    <main className="mx-auto flex min-h-full w-full max-w-5xl flex-1 items-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel rounded-[2rem] p-8 sm:p-10">
          <p className="eyebrow text-xs">Student recruiting, but organized</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Sign in to your internship tracker.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Your dashboard, analytics, notes, and recruiting pipeline are all scoped
            to your account now, which makes the project feel much closer to a real product.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-slate-700">
            <div className="rounded-2xl bg-white/85 p-4">
              Track applications, interviews, deadlines, and recruiter contacts in one place.
            </div>
            <div className="rounded-2xl bg-white/85 p-4">
              Create your own account, or use a locally seeded demo account if you configured one during setup.
            </div>
          </div>
        </div>

        <div className="panel rounded-[2rem] p-8 sm:p-10">
          <p className="eyebrow text-xs">Account access</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Welcome back
          </h2>
          {showRegisteredMessage ? (
            <div
              className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
              role="status"
            >
              Account created. You can sign in now.
            </div>
          ) : null}
          <div className="mt-6">
            <LoginForm callbackUrl={callbackUrl} />
          </div>
        </div>
      </section>
    </main>
  );
}
