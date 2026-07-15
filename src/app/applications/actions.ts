"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  Prisma,
  ApplicationStatus as PrismaApplicationStatus,
} from "@/generated/prisma/client";
import { requireCurrentUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";
import { isSafeHttpUrl } from "@/lib/security";

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

const FIELD_LENGTH_LIMITS = {
  company: 120,
  role: 120,
  location: 120,
  salary: 60,
  resumeVersion: 120,
  contactName: 120,
  contactTitle: 120,
  contactChannel: 120,
  tags: 300,
  notes: 4000,
} as const;

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

function isValidDateInput(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00Z`);

  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
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

  if (!isValidDateInput(values.appliedAt)) {
    return "Application date must be a real calendar date.";
  }

  if (!values.jobLink) {
    return "Job link is required.";
  }

  if (values.nextDeadline && !isValidDateInput(values.nextDeadline)) {
    return "Next deadline must be a real calendar date.";
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

  // Restricting links to http(s) prevents dangerous schemes like javascript:
  // from being stored and later executed through a normal anchor click.
  if (!isSafeHttpUrl(values.jobLink)) {
    return "Job link must be a valid http(s) URL.";
  }

  for (const [fieldName, maxLength] of Object.entries(FIELD_LENGTH_LIMITS)) {
    const value = values[fieldName as keyof typeof FIELD_LENGTH_LIMITS];

    if (value.length > maxLength) {
      return `${fieldName} is too long.`;
    }
  }

  const parsedTags = parseTagInput(values.tags);

  if (parsedTags.length > 10) {
    return "Please keep tags to 10 or fewer.";
  }

  if (parsedTags.some((tag) => tag.length > 32)) {
    return "Each tag must be 32 characters or fewer.";
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

async function saveTagsWithTransaction(
  transactionClient: Prisma.TransactionClient,
  applicationId: string,
  userId: string,
  rawTags: string,
) {
  const tags = parseTagInput(rawTags);

  await transactionClient.applicationTag.deleteMany({
    where: {
      applicationId,
    },
  });

  for (const tagName of tags) {
    const tag = await transactionClient.tag.upsert({
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

    await transactionClient.applicationTag.create({
      data: {
        applicationId,
        tagId: tag.id,
      },
    });
  }
}

async function saveContactWithTransaction(
  transactionClient: Prisma.TransactionClient,
  applicationId: string,
  values: ApplicationFormValues,
) {
  const hasContact = Boolean(
    values.contactName && values.contactTitle && values.contactChannel,
  );

  await transactionClient.contact.deleteMany({
    where: {
      applicationId,
    },
  });

  if (!hasContact) {
    return;
  }

  await transactionClient.contact.create({
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

  await prisma.$transaction(async (transactionClient) => {
    // Grouping the application, contact, and tag writes into one transaction
    // prevents half-saved records if any follow-up write fails.
    const application = await transactionClient.application.create({
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

    await saveContactWithTransaction(transactionClient, application.id, values);
    await saveTagsWithTransaction(
      transactionClient,
      application.id,
      user.id,
      values.tags,
    );
  });

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

  await prisma.$transaction(async (transactionClient) => {
    await transactionClient.application.update({
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

    await saveContactWithTransaction(transactionClient, applicationId, values);
    await saveTagsWithTransaction(
      transactionClient,
      applicationId,
      user.id,
      values.tags,
    );
  });

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
