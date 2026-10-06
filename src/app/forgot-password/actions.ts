"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { sendPasswordResetEmail } from "@/lib/email";
import { createPasswordResetToken } from "@/lib/password-reset";
import { consumeRateLimit, getClientIpFromHeaders } from "@/lib/security";
import { getUserAccountByEmail } from "@/lib/user-account-store";

export type ForgotPasswordState = {
  error: string | null;
  previewUrl: string | null;
  submitted: boolean;
  values: {
    email: string;
  };
};

const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address.").trim().toLowerCase(),
});

function getAppBaseUrl() {
  return process.env.NEXTAUTH_URL?.trim() || "http://localhost:3000";
}

export async function requestPasswordReset(
  _previousState: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const rawEmail = String(formData.get("email") ?? "").trim().toLowerCase();
  const parsedValues = forgotPasswordSchema.safeParse({
    email: rawEmail,
  });

  if (!parsedValues.success) {
    return {
      error: parsedValues.error.issues[0]?.message ?? "Invalid email address.",
      previewUrl: null,
      submitted: false,
      values: {
        email: rawEmail,
      },
    };
  }

  const requestHeaders = await headers();
  const clientIp = getClientIpFromHeaders(requestHeaders);
  const resetRateLimit = consumeRateLimit(
    `auth:password-reset:${clientIp}:${parsedValues.data.email}`,
    {
      limit: 5,
      windowMs: 10 * 60 * 1000,
    },
  );

  if (!resetRateLimit.allowed) {
    return {
      error: "Too many reset requests. Please wait a minute and try again.",
      previewUrl: null,
      submitted: false,
      values: {
        email: rawEmail,
      },
    };
  }

  let previewUrl: string | null = null;
  try {
    const user = await getUserAccountByEmail(parsedValues.data.email);
    if (user?.passwordHash) {
      const resetToken = await createPasswordResetToken(user.id);
      const resetUrl = `${getAppBaseUrl()}/reset-password?token=${resetToken.rawToken}`;
      const deliveryResult = await sendPasswordResetEmail({
        to: user.email,
        resetUrl,
      });

      previewUrl = deliveryResult.previewUrl ?? null;
    }
  } catch {
    // Delivery failures must not reveal whether an email belongs to an account.
    console.error("password_reset_request_failed");
  }

  return {
    error: null,
    previewUrl,
    submitted: true,
    values: {
      email: "",
    },
  };
}
