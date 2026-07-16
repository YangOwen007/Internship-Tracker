import {
  ApplicationForm,
} from "@/app/applications/_components/application-form";
import Link from "next/link";
import {
  createApplication,
} from "@/app/applications/actions";
import { createEmptyFormState } from "@/app/applications/form-state";
import { AppHeader } from "@/app/_components/app-header";
import { requireCurrentUser } from "@/lib/auth-user";

export default async function NewApplicationPage() {
  const user = await requireCurrentUser();

  return (
    <main className="flex flex-1 flex-col gap-6 pb-6">
      <AppHeader
        name={user.name ?? "Student recruiter"}
        email={user.email}
      />
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="panel rounded-[2rem] p-6 sm:p-8">
        {/* This page keeps the first CRUD flow intentionally focused:
            create a real application record and return to the dashboard. */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <p className="eyebrow text-xs">New application</p>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Add a new internship application
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Capture the essentials now, then come back later to add interview notes,
                recruiter context, or updated deadlines as the process moves forward.
              </p>
            </div>

            <Link
              href="/"
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400"
            >
              Exit
            </Link>
          </div>

          <div className="mt-8">
            <ApplicationForm
              action={createApplication}
              initialState={createEmptyFormState()}
              mode="create"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
