"use server";

import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { setUserPasswordHash } from "@/lib/user-account-store";

export type SignupFormState = {
  error: string | null;
  values: {
    name: string;
    email: string;
  };
};

const signupSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address.").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long."),
});

export async function signup(
  _previousState: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
  const rawValues = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
  };

  // Validation stays close to the action so the rules are easy to find when
  // you later expand account creation or add profile fields.
  const parsedValues = signupSchema.safeParse(rawValues);

  if (!parsedValues.success) {
    return {
      error: parsedValues.error.issues[0]?.message ?? "Invalid sign-up details.",
      values: {
        name: rawValues.name,
        email: rawValues.email,
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: parsedValues.data.email,
    },
  });

  if (existingUser) {
    return {
      error: "An account with that email already exists.",
      values: {
        name: rawValues.name,
        email: rawValues.email,
      },
    };
  }

  const passwordHash = await hash(parsedValues.data.password, 10);

  await prisma.user.create({
    data: {
      name: parsedValues.data.name,
      email: parsedValues.data.email,
    },
  });

  const createdUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: parsedValues.data.email,
    },
  });

  await setUserPasswordHash(createdUser.id, passwordHash);

  redirect("/login?registered=1");
}
