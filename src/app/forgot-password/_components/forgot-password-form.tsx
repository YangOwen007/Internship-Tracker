"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  ForgotPasswordState,
  requestPasswordReset,
} from "@/app/forgot-password/actions";

const initialState: ForgotPasswordState = {
  error: null,
  previewUrl: null,
  submitted: false,
  values: {
    email: "",
  },
};

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(requestPasswordReset, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      {state.error ? (
        <div
          className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          role="alert"
        >
          {state.error}
        </div>
      ) : null}

      {state.submitted ? (
        <div
          className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          role="status"
        >
          If an account exists for that email, we&apos;ve sent password reset instructions.
        </div>
      ) : null}

      {state.previewUrl ? (
        <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
          Development preview:{" "}
          <Link
            href={state.previewUrl}
            className="font-medium underline decoration-sky-300 underline-offset-4"
          >
            Open the reset link
          </Link>
        </div>
      ) : null}

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Email</span>
        <input
          name="email"
          type="email"
          required
          defaultValue={state.values.email}
          autoComplete="email"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
          placeholder="johndoe@example.com"
        />
      </label>

      <button
        type="submit"
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Send reset email
      </button>

      <p className="text-sm text-slate-500">
        Remembered your password?{" "}
        <Link
          href="/login"
          className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-4"
        >
          Go back to sign in
        </Link>
      </p>
    </form>
  );
}
