type EmailDeliveryResult = {
  previewUrl?: string;
};

export async function sendPasswordResetEmail(options: {
  resetUrl: string;
  to: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() ??
    "Internship Tracker <noreply@internship-tracker.local>";

  if (process.env.NODE_ENV === "production" &&
      (!resendApiKey || !process.env.RESEND_FROM_EMAIL?.trim())) {
    throw new Error("Password reset email delivery is not configured.");
  }

  if (resendApiKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [options.to],
        subject: "Reset your Internship Tracker password",
        text: [
          "We received a request to reset your Internship Tracker password.",
          "",
          `Open this link to choose a new password: ${options.resetUrl}`,
          "",
          "If you did not request this, you can safely ignore this email.",
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to send password reset email.");
    }

    return {} satisfies EmailDeliveryResult;
  }

  if (process.env.NODE_ENV !== "production") {
    return {
      previewUrl: options.resetUrl,
    } satisfies EmailDeliveryResult;
  }

  throw new Error(
    "Password reset email delivery is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL in production.",
  );
}
