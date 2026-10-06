import test, { after } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import "./local-database-only";
import { createPasswordResetToken, hashPasswordResetToken, resetPasswordWithToken } from "@/lib/password-reset";

after(() => prisma.$disconnect());

test("reset tokens are hashed, expire, and allow only one concurrent password change", async () => {
  const user = await prisma.user.create({
    data: { email: `reset-${randomUUID()}@example.test` },
  });
  try {
    const token = await createPasswordResetToken(user.id);
    const stored = await prisma.passwordResetToken.findUniqueOrThrow({
      where: { tokenHash: hashPasswordResetToken(token.rawToken) },
    });
    assert.notEqual(stored.tokenHash, token.rawToken);

    const passwordHash = await hash(randomUUID(), 10);
    const results = await Promise.all([
      resetPasswordWithToken({ rawToken: token.rawToken, passwordHash }),
      resetPasswordWithToken({ rawToken: token.rawToken, passwordHash }),
    ]);
    assert.equal(results.filter(Boolean).length, 1);
    assert.equal(await resetPasswordWithToken({ rawToken: token.rawToken, passwordHash }), null);

    const expired = await createPasswordResetToken(user.id);
    await prisma.passwordResetToken.update({
      where: { tokenHash: hashPasswordResetToken(expired.rawToken) },
      data: { expiresAt: new Date(0) },
    });
    assert.equal(await resetPasswordWithToken({ rawToken: expired.rawToken, passwordHash }), null);
  } finally {
    // Cascade cleanup removes only this test's user and associated reset tokens.
    await prisma.user.delete({ where: { id: user.id } });
  }
});
