import { prisma } from "@/lib/prisma";

export type UserAccountRecord = {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string | null;
};

export async function getUserAccountByEmail(email: string) {
  // We use raw SQL here because the generated Prisma client in this environment
  // can lag behind schema changes even when the actual database column exists.
  const rows = await prisma.$queryRaw<UserAccountRecord[]>`
    SELECT "id", "email", "name", "passwordHash"
    FROM "User"
    WHERE "email" = ${email}
    LIMIT 1
  `;

  return rows[0] ?? null;
}

export async function setUserPasswordHash(
  userId: string,
  passwordHash: string,
) {
  await prisma.$executeRaw`
    UPDATE "User"
    SET "passwordHash" = ${passwordHash},
        "updatedAt" = CURRENT_TIMESTAMP
    WHERE "id" = ${userId}
  `;
}
