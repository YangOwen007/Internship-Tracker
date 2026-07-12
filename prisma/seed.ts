import "dotenv/config";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import {
  ApplicationStatus,
  PrismaClient,
} from "../src/generated/prisma/client";
import { assertSqliteDatabaseUrl } from "../src/lib/database-config";
import { setUserPasswordHash } from "../src/lib/user-account-store";

const adapter = new PrismaBetterSqlite3({
  url: assertSqliteDatabaseUrl("prisma/seed.ts"),
});

const prisma = new PrismaClient({ adapter });

const demoUser = {
  email: "owen.yang.demo@internship-tracker.local",
  name: "Owen Yang",
  password: "demo12345",
};

const applications = [
  {
    company: "Figma",
    role: "Software Engineer Intern",
    location: "San Francisco, CA",
    status: ApplicationStatus.INTERVIEW,
    appliedAt: "2026-06-11",
    salary: "$52/hr",
    jobLink: "https://www.figma.com/careers/",
    nextDeadline: "2026-07-12",
    resumeVersion: "Resume v4 - product engineering",
    tags: ["frontend", "design-tools"],
    notes:
      "Strong fit. Mentioned dashboard project and ownership on AI tooling experiments.",
    contact: {
      name: "Maya Chen",
      title: "University Recruiter",
      channel: "Referral",
    },
  },
  {
    company: "Ramp",
    role: "Software Engineering Intern",
    location: "New York, NY",
    status: ApplicationStatus.OA,
    appliedAt: "2026-06-20",
    salary: "$60/hr",
    jobLink: "https://ramp.com/careers",
    nextDeadline: "2026-07-10",
    resumeVersion: "Resume v5 - backend emphasis",
    tags: ["fintech", "backend"],
    notes:
      "OA window closes soon. Prioritize finishing with clean explanations in comments.",
    contact: {
      name: "Jordan Patel",
      title: "Campus Recruiter",
      channel: "LinkedIn",
    },
  },
  {
    company: "Notion",
    role: "Product Engineering Intern",
    location: "Remote",
    status: ApplicationStatus.APPLIED,
    appliedAt: "2026-06-25",
    salary: "Unknown",
    jobLink: "https://www.notion.so/careers",
    nextDeadline: null,
    resumeVersion: "Resume v4 - product engineering",
    tags: ["product", "full-stack"],
    notes:
      "Need a better cover letter template tied to product intuition and developer empathy.",
    contact: null,
  },
  {
    company: "Datadog",
    role: "Software Engineer Intern",
    location: "Boston, MA",
    status: ApplicationStatus.FINAL_ROUND,
    appliedAt: "2026-05-29",
    salary: "$57/hr",
    jobLink: "https://careers.datadoghq.com",
    nextDeadline: "2026-07-15",
    resumeVersion: "Resume v5 - backend emphasis",
    tags: ["infra", "observability"],
    notes:
      "Prepare two scaling stories and one debugging story with measurable impact.",
    contact: {
      name: "Ari Green",
      title: "Engineer Interviewer",
      channel: "Email",
    },
  },
  {
    company: "Vercel",
    role: "Frontend Engineer Intern",
    location: "Hybrid",
    status: ApplicationStatus.INTERESTED,
    appliedAt: "2026-07-04",
    salary: "Unknown",
    jobLink: "https://vercel.com/careers",
    nextDeadline: "2026-07-18",
    resumeVersion: "Resume v4 - product engineering",
    tags: ["frontend", "platform"],
    notes: "Target after polishing this tracker and README screenshots.",
    contact: null,
  },
  {
    company: "Palantir",
    role: "Forward Deployed Software Engineer Intern",
    location: "Palo Alto, CA",
    status: ApplicationStatus.REJECTED,
    appliedAt: "2026-05-14",
    salary: "$56/hr",
    jobLink: "https://www.palantir.com/careers/",
    nextDeadline: null,
    resumeVersion: "Resume v3 - general SWE",
    tags: ["systems", "mission-driven"],
    notes: "Good reminder to tailor impact bullets earlier in the cycle.",
    contact: null,
  },
  {
    company: "Anthropic",
    role: "Applied AI Engineering Intern",
    location: "San Francisco, CA",
    status: ApplicationStatus.OFFER,
    appliedAt: "2026-04-30",
    salary: "$70/hr",
    jobLink: "https://www.anthropic.com/careers",
    nextDeadline: "2026-07-16",
    resumeVersion: "Resume v6 - AI systems",
    tags: ["ai", "ml-systems"],
    notes:
      "Offer in hand. Useful benchmark for what stories resonated across the loop.",
    contact: {
      name: "Sofia Ramirez",
      title: "Recruiting Coordinator",
      channel: "Email",
    },
  },
  {
    company: "Canva",
    role: "Software Engineer Intern",
    location: "Remote",
    status: ApplicationStatus.ARCHIVED,
    appliedAt: "2026-03-12",
    salary: "Unknown",
    jobLink: "https://www.canva.com/careers/",
    nextDeadline: null,
    resumeVersion: "Resume v2 - generalist",
    tags: ["design-tools"],
    notes:
      "Archived because the cycle closed before follow-up. Keep for analytics history.",
    contact: null,
  },
] as const;

async function main() {
  // This seed script is still SQLite-first for local development. Once the
  // Prisma provider flips to PostgreSQL, we can keep the seed data but drop
  // the SQLite-only guard and bootstrap workaround.
  await prisma.applicationTag.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.application.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  // We hash the demo password so the local auth flow matches how a real app
  // stores credentials instead of keeping plain text in the database.
  const passwordHash = await bcrypt.hash(demoUser.password, 10);

  const user = await prisma.user.create({
    data: {
      email: demoUser.email,
      name: demoUser.name,
    },
  });

  await setUserPasswordHash(user.id, passwordHash);

  for (const application of applications) {
    const created = await prisma.application.create({
      data: {
        userId: user.id,
        company: application.company,
        role: application.role,
        location: application.location,
        status: application.status,
        appliedAt: new Date(`${application.appliedAt}T00:00:00Z`),
        salary: application.salary,
        jobLink: application.jobLink,
        nextDeadline: application.nextDeadline
          ? new Date(`${application.nextDeadline}T00:00:00Z`)
          : null,
        resumeVersion: application.resumeVersion,
        notes: application.notes,
      },
    });

    if (application.contact) {
      await prisma.contact.create({
        data: {
          applicationId: created.id,
          name: application.contact.name,
          title: application.contact.title,
          channel: application.contact.channel,
        },
      });
    }

    for (const tagName of application.tags) {
      const tag = await prisma.tag.upsert({
        where: {
          userId_name: {
            userId: user.id,
            name: tagName,
          },
        },
        update: {},
        create: {
          userId: user.id,
          name: tagName,
        },
      });

      await prisma.applicationTag.create({
        data: {
          applicationId: created.id,
          tagId: tag.id,
        },
      });
    }
  }

  console.log(
    `Seeded ${applications.length} internship applications for ${user.email} (password: ${demoUser.password})`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
