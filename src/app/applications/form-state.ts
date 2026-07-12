import { ApplicationFormState, ApplicationFormValues } from "@/app/applications/actions";

// We keep the default form values in a plain module so both routes and the
// client form can import them without conflicting with Next.js server-action rules.
export const emptyApplicationFormValues: ApplicationFormValues = {
  company: "",
  role: "",
  location: "",
  status: "interested",
  appliedAt: "",
  salary: "",
  jobLink: "",
  nextDeadline: "",
  notes: "",
  resumeVersion: "",
  contactName: "",
  contactTitle: "",
  contactChannel: "",
  tags: "",
};

export function createEmptyFormState(): ApplicationFormState {
  return {
    error: null,
    values: emptyApplicationFormValues,
  };
}
