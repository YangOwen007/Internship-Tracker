import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ForgotPasswordForm } from "@/app/forgot-password/_components/forgot-password-form";
import { authOptions } from "@/lib/auth";

export default async function ForgotPasswordPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    redirect("/");
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-5xl flex-1 items-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel rounded-[2rem] p-8 sm:p-10">
          <p className="eyebrow text-xs">Account recovery</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Reset your password.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Enter the email address tied to your account and we&apos;ll send you a link
            to choose a new password.
          </p>
        </div>

        <div className="panel rounded-[2rem] p-8 sm:p-10">
          <p className="eyebrow text-xs">Reset link</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Send a recovery email
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            For security, we&apos;ll show the same confirmation whether or not the email
            exists in the system.
          </p>
          <div className="mt-6">
            <ForgotPasswordForm />
          </div>
        </div>
      </section>
    </main>
  );
}
