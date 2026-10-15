import Link from "next/link";
import { DeleteAccountForm } from "@/app/account/_components/delete-account-form";
import { requireCurrentUser } from "@/lib/auth-user";
import { getLegalConfiguration } from "@/lib/legal-config";

export const metadata = { title: "Account settings | Internship Tracker" };

export default async function AccountPage() {
  await requireCurrentUser();
  const { retention } = getLegalConfiguration();
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <section className="panel rounded-[2rem] p-6 sm:p-10">
        <Link href="/" className="text-sm underline underline-offset-4">Back to workspace</Link>
        <h1 className="mt-6 text-3xl font-semibold text-slate-950">Account settings</h1>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          Need a copy of your information or help with a privacy request? See{" "}
          <Link href="/privacy" className="underline">Privacy and contact</Link> before deleting your account.
        </p>
        <section className="mt-8 border-t border-rose-200 pt-6" aria-labelledby="delete-account-title">
          <h2 id="delete-account-title" className="text-xl font-semibold text-rose-800">Delete account</h2>
          <p id="delete-warning" className="mt-3 text-sm leading-7 text-slate-700">
            This permanently deletes your account, applications, notes, contacts, tags,
            tutorial preference, and password-reset records from the live database.
            It cannot be undone. Other users&apos; accounts are not affected.
            Save anything you need before continuing. This does not immediately erase
            historical backups or provider logs.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">{retention || "Provider log and backup retention has not been configured for a public deployment."}</p>
          <DeleteAccountForm />
        </section>
      </section>
    </main>
  );
}
