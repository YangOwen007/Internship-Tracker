import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SignupForm } from "@/app/signup/_components/signup-form";
import {
  createEmptySignupState,
} from "@/app/signup/form-state";
import { authOptions } from "@/lib/auth";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    redirect("/");
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-5xl flex-1 items-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel rounded-[2rem] p-8 sm:p-10">
          <p className="eyebrow text-xs">Start your search with a system that stays tidy</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Create your account.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Build a private workspace for applications, deadlines, contacts, notes, and
            progress across the recruiting pipeline.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-slate-700">
            <div className="rounded-2xl bg-white/85 p-4">
              Stay on top of interviews, follow-ups, and application deadlines.
            </div>
            <div className="rounded-2xl bg-white/85 p-4">
              See your search as a process, not just a list of submissions.
            </div>
          </div>
        </div>

        <div className="panel rounded-[2rem] p-8 sm:p-10">
          <p className="eyebrow text-xs">Account setup</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Start tracking your applications
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Create an account to save your progress and personalize your dashboard.
          </p>
          <div className="mt-6">
            <SignupForm initialState={createEmptySignupState()} />
          </div>
        </div>
      </section>
    </main>
  );
}
