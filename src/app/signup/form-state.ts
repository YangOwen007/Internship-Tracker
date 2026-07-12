import { SignupFormState } from "@/app/signup/actions";

// This mirrors the application form pattern: server actions stay in one file,
// while plain client-safe defaults live in a separate module.
export function createEmptySignupState(): SignupFormState {
  return {
    error: null,
    values: {
      name: "",
      email: "",
    },
  };
}
