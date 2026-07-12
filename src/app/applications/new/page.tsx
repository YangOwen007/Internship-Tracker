import {
  ApplicationForm,
} from "@/app/applications/_components/application-form";
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
          <div className="space-y-3">
            <p className="eyebrow text-xs">Application creation</p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Add a new internship application
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              This form writes directly to your database records, so saving here updates the
              dashboard, pipeline, and applications table the next time the homepage loads.
            </p>
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
