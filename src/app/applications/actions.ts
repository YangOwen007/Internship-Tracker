"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ApplicationStatus as PrismaApplicationStatus } from "@/generated/prisma/client";
import { requireCurrentUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";

export type ApplicationFormValues = {
  company: string;
  role: string;
  location: string;
  status: string;
  appliedAt: string;
  salary: string;
  jobLink: string;
  nextDeadline: string;
  notes: string;
  resumeVersion: string;
  contactName: string;
  contactTitle: string;
  contactChannel: string;
  tags: string;
};

export type ApplicationFormState = {
  error: string | null;
  values: ApplicationFormValues;
};

function normalizeStatus(value: string) {
  const mapping: Record<string, PrismaApplicationStatus> = {
    interested: PrismaApplicationStatus.INTERESTED,
    applied: PrismaApplicationStatus.APPLIED,
    oa: PrismaApplicationStatus.OA,
    interview: PrismaApplicationStatus.INTERVIEW,
    final_round: PrismaApplicationStatus.FINAL_ROUND,
    offer: PrismaApplicationStatus.OFFER,
    rejected: PrismaApplicationStatus.REJECTED,
    archived: PrismaApplicationStatus.ARCHIVED,
  };

  return mapping[value] ?? null;
}

// This helper reads raw form data once and converts it into a typed object
// so both validation and re-rendering can use the same normalized values.
function readFormValues(formData: FormData): ApplicationFormValues {
  const getString = (key: keyof ApplicationFormValues) =>
    String(formData.get(key) ?? "").trim();

  return {
    company: getString("company"),
    role: getString("role"),
    location: getString("location"),
    status: getString("status"),
    appliedAt: getString("appliedAt"),
    salary: getString("salary"),
    jobLink: getString("jobLink"),
    nextDeadline: getString("nextDeadline"),
    notes: getString("notes"),
    resumeVersion: getString("resumeVersion"),
    contactName: getString("contactName"),
    contactTitle: getString("contactTitle"),
    contactChannel: getString("contactChannel"),
    tags: getString("tags"),
  };
}

// We keep validation manual for now so the shape stays easy to inspect while
// still enforcing the real constraints our database logic expects.
function validateApplicationForm(values: ApplicationFormValues) {
  if (!values.company || !values.role || !values.location) {
    return "Company, role, and location are required.";
  }

  if (!values.appliedAt) {
    return "Application date is required.";
  }

  if (!values.jobLink) {
    return "Job link is required.";
  }

  const normalizedStatus = normalizeStatus(values.status);
  if (!normalizedStatus) {
    return "Please choose a valid application status.";
  }

  const contactFields = [
    values.contactName,
    values.contactTitle,
    values.contactChannel,
  ];
  const hasPartialContact =
    contactFields.some(Boolean) && !contactFields.every(Boolean);

  if (hasPartialContact) {
    return "If you add a contact, include name, title, and channel together.";
  }

  try {
    new URL(values.jobLink);
  } catch {
    return "Job link must be a valid URL.";
  }

  return null;
}

function parseTagInput(rawTags: string) {
  return Array.from(
    new Set(
      rawTags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}

async function saveTags(applicationId: string, userId: string, rawTags: string) {
  const tags = parseTagInput(rawTags);

  await prisma.applicationTag.deleteMany({
    where: {
      applicationId,
    },
  });

  for (const tagName of tags) {
    const tag = await prisma.tag.upsert({
      where: {
        userId_name: {
          userId,
          name: tagName,
        },
      },
      update: {},
      create: {
        userId,
        name: tagName,
      },
    });

    await prisma.applicationTag.create({
      data: {
        applicationId,
        tagId: tag.id,
      },
    });
  }
}

async function saveContact(
  applicationId: string,
  values: ApplicationFormValues,
) {
  const hasContact = Boolean(
    values.contactName && values.contactTitle && values.contactChannel,
  );

  await prisma.contact.deleteMany({
    where: {
      applicationId,
    },
  });

  if (!hasContact) {
    return;
  }

  await prisma.contact.create({
    data: {
      applicationId,
      name: values.contactName,
      title: values.contactTitle,
      channel: values.contactChannel,
    },
  });
}

// This smaller validator is used by the quick-status form on the dashboard.
// It lets us reuse the same status normalization rules without requiring the full edit form.
function validateStatusUpdate(rawStatus: string) {
  const status = normalizeStatus(rawStatus);

  if (!status) {
    throw new Error("Invalid application status provided.");
  }

  return status;
}

export async function createApplication(
  _previousState: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  const values = readFormValues(formData);
  const validationError = validateApplicationForm(values);

  if (validationError) {
    return {
      error: validationError,
      values,
    };
  }

  const user = await requireCurrentUser();
  const status = normalizeStatus(values.status)!;

  const application = await prisma.application.create({
    data: {
      userId: user.id,
      company: values.company,
      role: values.role,
      location: values.location,
      status,
      appliedAt: new Date(`${values.appliedAt}T00:00:00`),
      salary: values.salary || null,
      jobLink: values.jobLink,
      nextDeadline: values.nextDeadline
        ? new Date(`${values.nextDeadline}T00:00:00`)
        : null,
      notes: values.notes,
      resumeVersion: values.resumeVersion || null,
    },
  });

  await saveContact(application.id, values);
  await saveTags(application.id, user.id, values.tags);

  revalidatePath("/");
  redirect("/");
}

export async function updateApplication(
  applicationId: string,
  _previousState: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  const values = readFormValues(formData);
  const validationError = validateApplicationForm(values);

  if (validationError) {
    return {
      error: validationError,
      values,
    };
  }

  const user = await requireCurrentUser();
  const status = normalizeStatus(values.status)!;

  const existingApplication = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
  });

  if (!existingApplication || existingApplication.userId !== user.id) {
    return {
      error: "Application not found for the current user.",
      values,
    };
  }

  await prisma.application.update({
    where: {
      id: applicationId,
    },
    data: {
      company: values.company,
      role: values.role,
      location: values.location,
      status,
      appliedAt: new Date(`${values.appliedAt}T00:00:00`),
      salary: values.salary || null,
      jobLink: values.jobLink,
      nextDeadline: values.nextDeadline
        ? new Date(`${values.nextDeadline}T00:00:00`)
        : null,
      notes: values.notes,
      resumeVersion: values.resumeVersion || null,
    },
  });

  await saveContact(applicationId, values);
  await saveTags(applicationId, user.id, values.tags);

  revalidatePath("/");
  redirect("/");
}

export async function updateApplicationStatus(
  applicationId: string,
  formData: FormData,
) {
  const user = await requireCurrentUser();
  const status = validateStatusUpdate(String(formData.get("status") ?? ""));

  const application = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
  });

  if (!application || application.userId !== user.id) {
    throw new Error("Application not found for the current user.");
  }

  // This action updates only the recruiting stage so status changes can be fast
  // from the dashboard without reopening the full edit form.
  await prisma.application.update({
    where: {
      id: applicationId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/");
}
