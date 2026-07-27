import Link from "next/link";
import { ResetPasswordForm } from "@/app/reset-password/_components/reset-password-form";
import { isPasswordResetTokenValid } from "@/lib/password-reset";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;
  const token = params.token?.trim() ?? "";
  const isTokenValid = token ? await isPasswordResetTokenValid(token) : false;

  return (
    <main className="mx-auto flex min-h-full w-full max-w-5xl flex-1 items-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel rounded-[2rem] p-8 sm:p-10">
          <p className="eyebrow text-xs">Password update</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Choose a new password.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Pick a new password for your Internship Tracker account, then return to the
            sign-in page.
          </p>
        </div>

        <div className="panel rounded-[2rem] p-8 sm:p-10">
          <p className="eyebrow text-xs">Secure reset</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Reset your password
          </h2>

          {isTokenValid ? (
            <div className="mt-6">
              <ResetPasswordForm token={token} />
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              <div
                className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
                role="alert"
              >
                This password reset link is missing, expired, or has already been used.
              </div>
              <Link
                href="/forgot-password"
                className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Request a new reset link
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
