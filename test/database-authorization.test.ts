import test, { after } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { ApplicationStatus } from "@/generated/prisma/client";
import { updateApplicationStatusForUser } from "@/lib/application-store";
import { prisma } from "@/lib/prisma";
import "./local-database-only";

after(() => prisma.$disconnect());

test("application status updates are scoped to the owning user", async () => {
  const testRunId = randomUUID();
  const owner = await prisma.user.create({
    data: {
      email: `owner-${testRunId}@example.test`,
      name: "Test Owner",
    },
  });
  const otherUser = await prisma.user.create({
    data: {
      email: `other-${testRunId}@example.test`,
      name: "Other Test User",
    },
  });

  try {
    const application = await prisma.application.create({
      data: {
        userId: owner.id,
        company: "Example Company",
        role: "Engineering Intern",
        location: "Remote",
        status: ApplicationStatus.APPLIED,
        appliedAt: new Date("2026-01-01T00:00:00Z"),
        jobLink: "https://example.com/jobs/1",
      },
    });

    const wrongUserUpdated = await updateApplicationStatusForUser({
      applicationId: application.id,
      userId: otherUser.id,
      status: ApplicationStatus.OFFER,
    });
    const unchangedApplication = await prisma.application.findUniqueOrThrow({
      where: { id: application.id },
    });

    assert.equal(wrongUserUpdated, false);
    assert.equal(unchangedApplication.status, ApplicationStatus.APPLIED);

    const ownerUpdated = await updateApplicationStatusForUser({
      applicationId: application.id,
      userId: owner.id,
      status: ApplicationStatus.INTERVIEW,
    });

    assert.equal(ownerUpdated, true);
  } finally {
    // User deletion cascades through the application created by this test.
    await prisma.user.deleteMany({
      where: { id: { in: [owner.id, otherUser.id] } },
    });
  }
});
