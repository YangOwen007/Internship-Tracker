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
          <p className="eyebrow text-xs">Build something recruiter-worthy</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Create your account.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            This turns the project from a shared demo into a multi-user app, which is
            a meaningful step up for both product quality and portfolio strength.
          </p>
        </div>

        <div className="panel rounded-[2rem] p-8 sm:p-10">
          <p className="eyebrow text-xs">Account setup</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Start tracking your applications
          </h2>
          <div className="mt-6">
            <SignupForm initialState={createEmptySignupState()} />
          </div>
        </div>
      </section>
    </main>
  );
}
