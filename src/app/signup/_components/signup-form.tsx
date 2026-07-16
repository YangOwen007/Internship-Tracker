"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useFormStatus } from "react-dom";
import {
  SignupFormState,
  signup,
} from "@/app/signup/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Creating account..." : "Create account"}
    </button>
  );
}

export function SignupForm({ initialState }: { initialState: SignupFormState }) {
  const [state, formAction] = useActionState(signup, initialState);
  const [name, setName] = useState(initialState.values.name);
  const [email, setEmail] = useState(initialState.values.email);
  const [password, setPassword] = useState("");
  const [autoLoginError, setAutoLoginError] = useState<string | null>(null);
  const hasAttemptedAutoLogin = useRef(false);

  useEffect(() => {
    if (!state.createdEmail || hasAttemptedAutoLogin.current) {
      return;
    }

    hasAttemptedAutoLogin.current = true;
    setAutoLoginError(null);

    async function signInNewUser() {
      // We reuse the credentials flow here so account creation and sign-in
      // follow the exact same session rules and callbacks.
      const result = await signIn("credentials", {
        email: state.createdEmail,
        password,
        callbackUrl: "/",
        redirect: false,
      });

      if (!result || result.error) {
        setAutoLoginError(
          "Your account was created, but we could not sign you in automatically. Please sign in manually.",
        );
        return;
      }

      window.location.assign(result.url ?? "/");
    }

    void signInNewUser();
  }, [password, state.createdEmail]);

  return (
    <form action={formAction} className="grid gap-5">
      {state.error || autoLoginError ? (
        <div
          className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          role="alert"
        >
          {state.error ?? autoLoginError}
        </div>
      ) : null}

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Name</span>
        <input
          name="name"
          type="text"
          required
          value={name}
          onChange={(event) => {
            hasAttemptedAutoLogin.current = false;
            setAutoLoginError(null);
            setName(event.target.value);
          }}
          autoComplete="name"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
          placeholder="Owen Yang"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Email</span>
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => {
            hasAttemptedAutoLogin.current = false;
            setAutoLoginError(null);
            setEmail(event.target.value);
          }}
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
          value={password}
          onChange={(event) => {
            hasAttemptedAutoLogin.current = false;
            setAutoLoginError(null);
            setPassword(event.target.value);
          }}
          autoComplete="new-password"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
          placeholder="At least 8 characters"
        />
      </label>

      <SubmitButton />

      <p className="text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-4">
          Sign in
        </Link>
      </p>
    </form>
  );
}
