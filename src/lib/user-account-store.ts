import { prisma } from "@/lib/prisma";

export type UserAccountRecord = {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string | null;
};

export async function getUserAccountByEmail(email: string) {
  // With the PostgreSQL cutover complete, the generated client is the source
  // of truth again and we can keep account reads type-safe.
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      passwordHash: true,
    },
  });
}

export async function setUserPasswordHash(
  userId: string,
  passwordHash: string,
) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      passwordHash,
    },
  });
}
