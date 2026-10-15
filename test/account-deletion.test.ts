import test, { after } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { accountDeletionSchema, deleteOwnAccount } from "@/lib/account-deletion";
import { createPasswordResetToken } from "@/lib/password-reset";
import "./local-database-only";

after(() => prisma.$disconnect());

test("deletion requires exact confirmation and a nonempty current password", () => {
  assert.equal(accountDeletionSchema.safeParse({ password: "a-password", confirmation: "delete" }).success, false);
  assert.equal(accountDeletionSchema.safeParse({ password: "", confirmation: "DELETE" }).success, false);
});

test("deletion verifies a password, cascades all owned records, and leaves other users intact", async () => {
  const run = randomUUID();
  const password = randomUUID();
  const passwordHash = await hash(password, 10);
  const owner = await prisma.user.create({ data: { email: `delete-${run}@example.test`, passwordHash } });
  const other = await prisma.user.create({ data: { email: `keep-${run}@example.test`, passwordHash } });
  try {
    const application = await prisma.application.create({ data: {
      userId: owner.id, company: "Example Company", role: "Intern", location: "Remote",
      status: "APPLIED", appliedAt: new Date(), jobLink: "https://example.com/job",
      contact: { create: { name: "Example Contact", title: "Recruiter", channel: "Email" } },
    } });
    const tag = await prisma.tag.create({ data: { userId: owner.id, name: "test" } });
    await prisma.applicationTag.create({ data: { applicationId: application.id, tagId: tag.id } });
    await createPasswordResetToken(owner.id);
    const otherApplication = await prisma.application.create({ data: {
      userId: other.id, company: "Other Company", role: "Intern", location: "Remote",
      status: "APPLIED", appliedAt: new Date(), jobLink: "https://example.com/other",
    } });

    assert.equal(await deleteOwnAccount({ userId: owner.id, password: "wrong-password", confirmation: "DELETE" }), false);
    assert.equal(await deleteOwnAccount({ userId: owner.id, password, confirmation: "no" }), false);
    assert.ok(await prisma.user.findUnique({ where: { id: owner.id } }));
    assert.equal(await deleteOwnAccount({ userId: owner.id, password, confirmation: "DELETE" }), true);
    assert.equal(await prisma.user.count({ where: { id: owner.id } }), 0);
    assert.equal(await prisma.application.count({ where: { userId: owner.id } }), 0);
    assert.equal(await prisma.contact.count({ where: { applicationId: application.id } }), 0);
    assert.equal(await prisma.tag.count({ where: { userId: owner.id } }), 0);
    assert.equal(await prisma.applicationTag.count({ where: { applicationId: application.id } }), 0);
    assert.equal(await prisma.passwordResetToken.count({ where: { userId: owner.id } }), 0);
    assert.ok(await prisma.user.findUnique({ where: { id: other.id } }));
    assert.ok(await prisma.application.findUnique({ where: { id: otherApplication.id } }));
    assert.equal(await deleteOwnAccount({ userId: owner.id, password, confirmation: "DELETE" }), false);
  } finally {
    // Never seed/reset a database for this test; remove only its unique fixtures.
    await prisma.user.deleteMany({ where: { id: { in: [owner.id, other.id] } } });
  }
});
