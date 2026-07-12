import Link from "next/link";
import { SignOutButton } from "@/app/_components/sign-out-button";

type AppHeaderProps = {
  name: string;
  email: string;
};

export function AppHeader({ name, email }: AppHeaderProps) {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 pt-6 sm:px-6 lg:px-8">
      <div>
        <Link href="/" className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
          Internship Tracker
        </Link>
        <p className="mt-1 text-sm text-slate-500">
          Signed in as {name} <span className="font-mono">({email})</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/applications/new"
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Add application
        </Link>
        <SignOutButton />
      </div>
    </header>
  );
}
