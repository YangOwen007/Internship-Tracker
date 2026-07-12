import { notFound } from "next/navigation";
import { AppHeader } from "@/app/_components/app-header";
import { ApplicationForm } from "@/app/applications/_components/application-form";
import {
  ApplicationFormState,
  updateApplication,
} from "@/app/applications/actions";
import { ApplicationStatus as PrismaApplicationStatus } from "@/generated/prisma/client";
import { requireCurrentUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";

type EditApplicationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditApplicationPage({
  params,
}: EditApplicationPageProps) {
  const { id } = await params;
  const user = await requireCurrentUser();

  // The edit route is user-scoped so one account can never load or mutate
  // another user's applications just by guessing an ID.
  const application = await prisma.application.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      contact: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!application) {
    notFound();
  }

  // We convert the Prisma enum into the exact form values the shared select expects.
  const statusValueMap: Record<PrismaApplicationStatus, string> = {
    INTERESTED: "interested",
    APPLIED: "applied",
    OA: "oa",
    INTERVIEW: "interview",
    FINAL_ROUND: "final_round",
    OFFER: "offer",
    REJECTED: "rejected",
    ARCHIVED: "archived",
  };

  const initialState: ApplicationFormState = {
    error: null,
    values: {
      company: application.company,
      role: application.role,
      location: application.location,
      status: statusValueMap[application.status],
      appliedAt: application.appliedAt.toISOString().slice(0, 10),
      salary: application.salary ?? "",
      jobLink: application.jobLink,
      nextDeadline: application.nextDeadline
        ? application.nextDeadline.toISOString().slice(0, 10)
        : "",
      notes: application.notes,
      resumeVersion: application.resumeVersion ?? "",
      contactName: application.contact?.name ?? "",
      contactTitle: application.contact?.title ?? "",
      contactChannel: application.contact?.channel ?? "",
      tags: application.tags.map((entry) => entry.tag.name).join(", "),
    },
  };

  return (
    <main className="flex flex-1 flex-col gap-6 pb-6">
      <AppHeader
        name={user.name ?? "Student recruiter"}
        email={user.email}
      />
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="panel rounded-[2rem] p-6 sm:p-8">
          <div className="space-y-3">
            <p className="eyebrow text-xs">Application editing</p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Edit {application.company}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Update recruiting status, notes, deadlines, or contact info here without
              re-entering the rest of the record.
            </p>
          </div>

          <div className="mt-8">
            <ApplicationForm
              action={updateApplication.bind(null, application.id)}
              initialState={initialState}
              mode="edit"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
