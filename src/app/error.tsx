"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  // Keep stack traces and database details out of the user-facing recovery UI.
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-20">
      <section className="panel rounded-[2rem] p-8" role="alert">
        <h1 className="text-2xl font-semibold text-slate-950">We couldn&apos;t load this page</h1>
        <p className="mt-4 text-slate-600">Please try again in a moment. Your saved applications have not been removed.</p>
        <button type="button" onClick={reset} className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-white">Try again</button>
      </section>
    </main>
  );
}
