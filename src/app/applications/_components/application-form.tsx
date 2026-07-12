"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import {
  ApplicationFormState,
  ApplicationFormValues,
} from "@/app/applications/actions";
import { statusLabels, statuses } from "@/lib/applications";

type ApplicationFormProps = {
  action: (
    state: ApplicationFormState,
    formData: FormData,
  ) => Promise<ApplicationFormState>;
  initialState: ApplicationFormState;
  mode: "create" | "edit";
};

function SubmitButton({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
    >
      {pending
        ? mode === "create"
          ? "Saving application..."
          : "Updating application..."
        : mode === "create"
          ? "Create application"
          : "Save changes"}
    </button>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  name: keyof ApplicationFormValues;
  defaultValue: string;
  required?: boolean;
  placeholder?: string;
  type?: "text" | "date" | "url";
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
      />
    </label>
  );
}

// The form is shared by both "new" and "edit" routes so the data shape only
// lives in one place as we expand CRUD behavior.
export function ApplicationForm({
  action,
  initialState,
  mode,
}: ApplicationFormProps) {
  const [state, formAction] = useActionState(action, initialState);
  const values = state.values;

  return (
    <form action={formAction} className="grid gap-6">
      {state.error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.error}
        </div>
      ) : null}

      {/* Core application fields describe the job opportunity itself. */}
      <section className="grid gap-4 md:grid-cols-2">
        <Field
          label="Company"
          name="company"
          defaultValue={values.company}
          required
          placeholder="Figma"
        />
        <Field
          label="Role"
          name="role"
          defaultValue={values.role}
          required
          placeholder="Software Engineer Intern"
        />
        <Field
          label="Location"
          name="location"
          defaultValue={values.location}
          required
          placeholder="San Francisco, CA"
        />
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Status</span>
          <select
            name="status"
            defaultValue={values.status}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </label>
        <Field
          label="Applied Date"
          name="appliedAt"
          type="date"
          defaultValue={values.appliedAt}
          required
        />
        <Field
          label="Next Deadline"
          name="nextDeadline"
          type="date"
          defaultValue={values.nextDeadline}
        />
        <Field
          label="Job Link"
          name="jobLink"
          type="url"
          defaultValue={values.jobLink}
          required
          placeholder="https://company.com/jobs/..."
        />
        <Field
          label="Salary"
          name="salary"
          defaultValue={values.salary}
          placeholder="$55/hr"
        />
        <Field
          label="Resume Version"
          name="resumeVersion"
          defaultValue={values.resumeVersion}
          placeholder="Resume v5 - backend emphasis"
        />
        <Field
          label="Tags"
          name="tags"
          defaultValue={values.tags}
          placeholder="frontend, fintech, backend"
        />
      </section>

      {/* Recruiter/contact fields stay optional, but grouped together. */}
      <OptionalContactFields
        key={`${values.contactName}|${values.contactTitle}|${values.contactChannel}`}
        values={values}
      />

      {/* Notes are freeform because interview prep and recruiting context vary a lot. */}
      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Notes</span>
        <textarea
          name="notes"
          defaultValue={values.notes}
          rows={6}
          placeholder="Write interview prep notes, recruiter context, follow-up reminders, or why the role matters to you."
          className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-slate-400"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton mode={mode} />
        <Link
          href="/"
          className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function OptionalContactFields({
  values,
}: {
  values: ApplicationFormValues;
}) {
  const [showContactFields, setShowContactFields] = useState(
    Boolean(
      values.contactName || values.contactTitle || values.contactChannel,
    ),
  );

  return (
    <section className="grid gap-4">
      <label className="flex items-center gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={showContactFields}
          onChange={(event) => setShowContactFields(event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-slate-950"
        />
        <span className="font-medium">Add recruiter or referral contact</span>
      </label>

      {showContactFields ? (
        <div className="grid gap-4 md:grid-cols-3">
          <Field
            label="Contact Name"
            name="contactName"
            defaultValue={values.contactName}
            placeholder="Jordan Patel"
          />
          <Field
            label="Contact Title"
            name="contactTitle"
            defaultValue={values.contactTitle}
            placeholder="Campus Recruiter"
          />
          <Field
            label="Contact Channel"
            name="contactChannel"
            defaultValue={values.contactChannel}
            placeholder="Referral, LinkedIn, Email"
          />
        </div>
      ) : null}
    </section>
  );
}
