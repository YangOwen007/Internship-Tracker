"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { signOut } from "next-auth/react";
import { deleteAccount } from "@/app/account/actions";

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="rounded-full bg-rose-700 px-5 py-3 text-sm font-medium text-white hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-60">
      {pending ? "Deleting account..." : "Permanently delete my account"}
    </button>
  );
}

export function DeleteAccountForm() {
  const [state, formAction] = useActionState(deleteAccount, { error: null, deleted: false });
  const [signOutFailed, setSignOutFailed] = useState(false);

  useEffect(() => {
    if (!state.deleted) return;
    // Only clear the browser's auth cookie after the server confirms deletion.
    // Other browsers' cookies cannot restore an account removed from the DB.
    void signOut({ callbackUrl: "/login?accountDeleted=1" }).catch(() => setSignOutFailed(true));
  }, [state.deleted]);

  if (state.deleted) {
    return <div role="status" className="text-sm leading-7 text-slate-700">
      Your account and live-database records have been deleted.
      {signOutFailed ? " The browser could not finish signing out. You can safely close this tab; the deleted account can no longer open its workspace." : " Signing you out..."}
    </div>;
  }

  return (
    <form action={formAction} className="mt-6 grid gap-5">
      {state.error ? <p role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{state.error}</p> : null}
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Current password
        <input name="password" type="password" required maxLength={72} autoComplete="current-password" className="rounded-2xl border border-slate-300 bg-white px-4 py-3" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Type DELETE to confirm
        <input name="confirmation" type="text" required pattern="DELETE" autoComplete="off" autoCapitalize="characters" spellCheck={false} aria-describedby="delete-warning" className="rounded-2xl border border-slate-300 bg-white px-4 py-3" />
      </label>
      <DeleteButton />
    </form>
  );
}
