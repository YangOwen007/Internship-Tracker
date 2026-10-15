import Link from "next/link";

// Legal links stay available on authentication pages as well as the workspace.
export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-7xl px-4 py-6 text-sm text-slate-600 sm:px-6 lg:px-8">
      <nav aria-label="Legal and support" className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        <Link href="/privacy" className="underline underline-offset-4">Privacy and contact</Link>
        <Link href="/terms" className="underline underline-offset-4">Terms</Link>
        <a href="/third-party-licenses.txt" className="underline underline-offset-4">Third-party notices</a>
      </nav>
      <p className="mt-3 text-center text-xs">Independent portfolio project by Owen Yang. No employer endorsement.</p>
    </footer>
  );
}
