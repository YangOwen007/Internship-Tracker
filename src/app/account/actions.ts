"use server";

import { requireCurrentUser } from "@/lib/auth-user";
import { accountDeletionSchema, deleteOwnAccount } from "@/lib/account-deletion";
import { consumeRateLimit } from "@/lib/security";

export type DeleteAccountState = { error: string | null; deleted: boolean };

export async function deleteAccount(
  _state: DeleteAccountState,
  formData: FormData,
): Promise<DeleteAccountState> {
  const user = await requireCurrentUser();
  const limit = consumeRateLimit(`account:delete:${user.id}`, {
    limit: 5, windowMs: 10 * 60 * 1000,
  });
  if (!limit.allowed) return { error: "Too many attempts. Please wait ten minutes and try again.", deleted: false };

  const parsed = accountDeletionSchema.safeParse({
    password: formData.get("password"),
    confirmation: formData.get("confirmation"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Check the confirmation fields.", deleted: false };

  try {
    // Do not accept an email or account ID from the browser, even if supplied.
    const deleted = await deleteOwnAccount({ userId: user.id, ...parsed.data });
    return deleted
      ? { error: null, deleted: true }
      : { error: "Could not verify your current password. Your account was not deleted.", deleted: false };
  } catch {
    // Keep sensitive fields and database error details out of logs and responses.
    console.error("account_deletion_failed");
    return { error: "We could not delete your account. Please try again later.", deleted: false };
  }
}
