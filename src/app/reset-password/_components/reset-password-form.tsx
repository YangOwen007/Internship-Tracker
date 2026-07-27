"use client";

import { useActionState, useState } from "react";
import { ResetPasswordState, resetPasswordAction } from "@/app/reset-password/actions";

export function ResetPasswordForm({ token }: { token: string }) {
  const initialState: ResetPasswordState = {
    error: null,
    values: {
      token,
      password: "",
      confirmPassword: "",
    },
  };
  const [state, formAction] = useActionState(resetPasswordAction, initialState);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="token" value={token} />

      {state.error ? (
        <div
          className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          role="alert"
        >
          {state.error}
        </div>
      ) : null}

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">New Password</span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
          placeholder="At least 8 characters"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Confirm Password</span>
        <input
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
          placeholder="Re-enter your password"
        />
      </label>

      {passwordsMismatch ? (
        <p className="text-sm text-rose-700" role="alert">
          Passwords must match before you can save a new one.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={passwordsMismatch}
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Reset password
      </button>
    </form>
  );
}
