import { createHash, randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";

const RESET_TOKEN_TTL_MS = 1000 * 60 * 60;

export function hashPasswordResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createPasswordResetToken(userId: string) {
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashPasswordResetToken(rawToken);
  const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);

  // We keep only the newest live token per user so the reset flow stays easy
  // to reason about and old links do not remain valid longer than needed.
  await prisma.passwordResetToken.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.passwordResetToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  return {
    rawToken,
    expiresAt,
  };
}

export async function resetPasswordWithToken(options: {
  rawToken: string;
  passwordHash: string;
}) {
  const tokenHash = hashPasswordResetToken(options.rawToken);
  const now = new Date();

  const tokenRecord = await prisma.passwordResetToken.findUnique({
    where: {
      tokenHash,
    },
    include: {
      user: true,
    },
  });

  if (
    !tokenRecord ||
    tokenRecord.usedAt ||
    tokenRecord.expiresAt <= now
  ) {
    return null;
  }

  return prisma.$transaction(async (transaction) => {
    // Claim the token with a conditional write so two concurrent requests
    // cannot both change the password using the same reset link.
    const claimed = await transaction.passwordResetToken.updateMany({
      where: { id: tokenRecord.id, usedAt: null, expiresAt: { gt: now } },
      data: { usedAt: now },
    });
    if (claimed.count !== 1) return null;

    return transaction.user.update({
      where: {
        id: tokenRecord.user.id,
      },
      data: {
        passwordHash: options.passwordHash,
      },
    });
  });
}

export async function isPasswordResetTokenValid(rawToken: string) {
  const tokenHash = hashPasswordResetToken(rawToken);

  const tokenRecord = await prisma.passwordResetToken.findUnique({
    where: {
      tokenHash,
    },
    select: {
      expiresAt: true,
      usedAt: true,
    },
  });

  if (!tokenRecord) {
    return false;
  }

  return !tokenRecord.usedAt && tokenRecord.expiresAt > new Date();
}
