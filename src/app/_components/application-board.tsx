"use client";

import { useMemo, useOptimistic, useTransition } from "react";
import { BoardColumn } from "@/app/_components/board-column";
import { updateApplicationStatus } from "@/app/applications/actions";
import {
  ApplicationRecord,
  statuses,
} from "@/lib/applications";

type ApplicationBoardProps = {
  applications: ApplicationRecord[];
};

const boardStatuses = statuses;

export function ApplicationBoard({ applications }: ApplicationBoardProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticApplications, applyOptimisticMove] = useOptimistic(
    applications,
    (
      currentApplications,
      move: {
        applicationId: string;
        nextStatus: ApplicationRecord["status"];
      },
    ) =>
      currentApplications.map((application) =>
        application.id === move.applicationId
          ? {
              ...application,
              status: move.nextStatus,
            }
          : application,
      ),
  );

  const groupedApplications = useMemo(
    () =>
      Object.fromEntries(
        boardStatuses.map((status) => [
          status,
          optimisticApplications.filter(
            (application) => application.status === status,
          ),
        ]),
      ) as Record<(typeof boardStatuses)[number], ApplicationRecord[]>,
    [optimisticApplications],
  );

  function moveApplication(
    applicationId: string,
    nextStatus: ApplicationRecord["status"],
  ) {
    const formData = new FormData();
    formData.set("status", nextStatus);

    applyOptimisticMove({ applicationId, nextStatus });

    startTransition(async () => {
      await updateApplicationStatus(applicationId, formData);
    });
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-4">
      {boardStatuses.map((status) => (
        <BoardColumn
          key={status}
          status={status}
          applications={groupedApplications[status]}
          isPending={isPending}
          onMoveApplication={moveApplication}
        />
      ))}
    </div>
  );
}
