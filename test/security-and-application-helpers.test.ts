import test from "node:test";
import assert from "node:assert/strict";
import {
  buildWeeklyApplications,
  filterApplications,
  sortApplications,
  type ApplicationRecord,
} from "@/lib/applications";
import {
  isSafeHttpUrl,
  sanitizeCallbackPath,
} from "@/lib/security";

const sampleApplications: ApplicationRecord[] = [
  {
    id: "1",
    company: "Notion",
    role: "Product Engineer",
    location: "Remote",
    status: "applied",
    appliedAt: "2026-07-01",
    salary: null,
    jobLink: "https://www.notion.so/careers",
    nextDeadline: "2026-07-18",
    contact: null,
    resumeVersion: null,
    tags: ["product"],
    notes: "",
  },
  {
    id: "2",
    company: "Figma",
    role: "Frontend Engineer",
    location: "San Francisco, CA",
    status: "interview",
    appliedAt: "2026-07-03",
    salary: null,
    jobLink: "https://www.figma.com/careers/",
    nextDeadline: "2026-07-10",
    contact: null,
    resumeVersion: null,
    tags: ["frontend"],
    notes: "",
  },
];

test("sanitizeCallbackPath only allows safe same-site paths", () => {
  assert.equal(sanitizeCallbackPath("/applications/new"), "/applications/new");
  assert.equal(sanitizeCallbackPath("https://attacker.example"), "/");
  assert.equal(sanitizeCallbackPath("//attacker.example"), "/");
  assert.equal(sanitizeCallbackPath("\\evil"), "/");
});

test("isSafeHttpUrl rejects dangerous schemes", () => {
  assert.equal(isSafeHttpUrl("https://example.com/jobs"), true);
  assert.equal(isSafeHttpUrl("http://example.com/jobs"), true);
  assert.equal(isSafeHttpUrl("javascript:alert(1)"), false);
  assert.equal(isSafeHttpUrl("data:text/html,<script>alert(1)</script>"), false);
});

test("sortApplications orders deadlines with nulls last", () => {
  const sorted = sortApplications(
    [
      sampleApplications[0],
      {
        ...sampleApplications[1],
        id: "3",
        nextDeadline: null,
      },
    ],
    "deadline_asc",
  );

  assert.equal(sorted[0]?.id, "1");
  assert.equal(sorted[1]?.id, "3");
});

test("filterApplications applies combined search, status, and location filters", () => {
  const filtered = filterApplications(
    sampleApplications,
    "fig",
    "interview",
    "San Francisco, CA",
  );

  assert.deepEqual(filtered.map((application) => application.id), ["2"]);
});

test("buildWeeklyApplications includes at least one bucket for empty datasets", () => {
  const weekly = buildWeeklyApplications([], 6);

  assert.equal(weekly.length, 6);
  assert.ok(weekly.every((bucket) => bucket.value === 0));
});
