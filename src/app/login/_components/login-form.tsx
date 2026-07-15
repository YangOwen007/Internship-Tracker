"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

type LoginFormProps = {
  callbackUrl: string;
};

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);

    const result = await signIn("credentials", {
      email: String(formData.get("email") ?? "").trim().toLowerCase(),
      password: String(formData.get("password") ?? ""),
      callbackUrl,
      redirect: false,
    });

    setIsPending(false);

    if (!result || result.error) {
      setError("Incorrect email or password.");
      return;
    }

    window.location.href = result.url ?? callbackUrl;
  }

  return (
    <form action={handleSubmit} className="grid gap-5">
      {error ? (
        <div
          className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      {/* Keeping the login form small makes the auth flow easier to inspect
          while still following the same app styling as the dashboard. */}
      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
          placeholder="owen@example.com"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Password</span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="current-password"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
          placeholder="At least 8 characters"
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-sm text-slate-500">
        New here?{" "}
        <Link href="/signup" className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-4">
          Create an account
        </Link>
      </p>
    </form>
  );
}
