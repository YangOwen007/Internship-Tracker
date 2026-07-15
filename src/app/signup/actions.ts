"use server";

import { hash } from "bcryptjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  consumeRateLimit,
  getClientIpFromHeaders,
} from "@/lib/security";

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
    .min(8, "Password must be at least 8 characters long.")
    .max(72, "Password must be 72 characters or fewer."),
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

  const requestHeaders = await headers();
  const clientIp = getClientIpFromHeaders(requestHeaders);
  const signupRateLimit = consumeRateLimit(
    `auth:signup:${clientIp}:${parsedValues.data.email}`,
    {
      limit: 5,
      windowMs: 10 * 60 * 1000,
    },
  );

  if (!signupRateLimit.allowed) {
    return {
      error: "Too many sign-up attempts. Please wait a minute and try again.",
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
      error: "Unable to create that account. If you already registered, try signing in instead.",
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
      passwordHash,
    },
  });

  redirect("/login?registered=1");
}
