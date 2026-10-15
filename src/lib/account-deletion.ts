import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const accountDeletionSchema = z.object({
  password: z.string().min(1, "Enter your current password.").max(72),
  confirmation: z.literal("DELETE", { error: "Type DELETE to confirm permanent deletion." }),
});

// The caller must obtain userId from its verified server session, never a form.
export async function deleteOwnAccount(options: {
  userId: string;
  password: string;
  confirmation: string;
}) {
  const parsed = accountDeletionSchema.safeParse(options);
  if (!parsed.success) return false;

  const user = await prisma.user.findUnique({
    where: { id: options.userId },
    select: { passwordHash: true },
  });
  if (!user?.passwordHash || !await compare(parsed.data.password, user.passwordHash)) {
    return false;
  }

  // Include the verified hash in the delete predicate: if a concurrent password
  // reset changes it, the old password cannot authorize a later deletion.
  // Foreign-key cascades remove only this user's dependent records atomically.
  const result = await prisma.user.deleteMany({
    where: { id: options.userId, passwordHash: user.passwordHash },
  });
  return result.count === 1;
}
