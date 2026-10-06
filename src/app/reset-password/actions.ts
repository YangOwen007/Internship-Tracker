"use server";

import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { resetPasswordWithToken } from "@/lib/password-reset";

export type ResetPasswordState = {
  error: string | null;
  values: {
    confirmPassword: string;
    password: string;
    token: string;
  };
};

const resetPasswordSchema = z.object({
  token: z.string().regex(/^[a-f0-9]{64}$/, "This reset link is invalid."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(72, "Password must be 72 characters or fewer."),
  confirmPassword: z.string(),
}).refine((values) => values.password === values.confirmPassword, {
  message: "Passwords must match.",
  path: ["confirmPassword"],
});

export async function resetPasswordAction(
  _previousState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const rawValues = {
    token: String(formData.get("token") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  };

  const parsedValues = resetPasswordSchema.safeParse(rawValues);

  if (!parsedValues.success) {
    return {
      error: parsedValues.error.issues[0]?.message ?? "Invalid password reset request.",
      values: { ...rawValues, password: "", confirmPassword: "" },
    };
  }

  const passwordHash = await hash(parsedValues.data.password, 10);
  const user = await resetPasswordWithToken({
    rawToken: parsedValues.data.token,
    passwordHash,
  });

  if (!user) {
    return {
      error: "This reset link is invalid or has expired.",
      values: {
        ...rawValues,
        password: "",
        confirmPassword: "",
      },
    };
  }

  redirect("/login?reset=1");
}
