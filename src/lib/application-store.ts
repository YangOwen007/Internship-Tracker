import { ApplicationStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function updateApplicationStatusForUser({
  applicationId,
  userId,
  status,
}: {
  applicationId: string;
  userId: string;
  status: ApplicationStatus;
}) {
  // The ownership condition is part of the write itself, preventing a caller
  // from updating another user's application even if they know its ID.
  const result = await prisma.application.updateMany({
    where: {
      id: applicationId,
      userId,
    },
    data: {
      status,
    },
  });

  return result.count === 1;
}
