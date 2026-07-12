import Database from "better-sqlite3";
import {
  assertSqliteDatabaseUrl,
  getSqliteDatabasePath,
} from "../src/lib/database-config";

const dbPath = getSqliteDatabasePath(
  assertSqliteDatabaseUrl("prisma/bootstrap.ts"),
);

const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

// This small migration helper lets us evolve the SQLite schema safely without
// requiring Prisma migrations in the current local Windows setup.
function ensureColumn(tableName: string, columnName: string, definition: string) {
  const columns = db
    .prepare(`PRAGMA table_info("${tableName}")`)
    .all() as Array<{ name: string }>;
  const hasColumn = columns.some((column) => column.name === columnName);

  if (!hasColumn) {
    db.exec(`ALTER TABLE "${tableName}" ADD COLUMN "${columnName}" ${definition}`);
  }
}

db.exec(`
  CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

  CREATE TABLE IF NOT EXISTS "Application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "appliedAt" DATETIME NOT NULL,
    "salary" TEXT,
    "jobLink" TEXT NOT NULL,
    "nextDeadline" DATETIME,
    "notes" TEXT NOT NULL DEFAULT '',
    "resumeVersion" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Application_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User" ("id")
      ON DELETE CASCADE ON UPDATE CASCADE
  );

  CREATE INDEX IF NOT EXISTS "Application_userId_status_idx"
    ON "Application"("userId", "status");
  CREATE INDEX IF NOT EXISTS "Application_appliedAt_idx"
    ON "Application"("appliedAt");

  CREATE TABLE IF NOT EXISTS "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "applicationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    CONSTRAINT "Contact_applicationId_fkey"
      FOREIGN KEY ("applicationId") REFERENCES "Application" ("id")
      ON DELETE CASCADE ON UPDATE CASCADE
  );

  CREATE UNIQUE INDEX IF NOT EXISTS "Contact_applicationId_key"
    ON "Contact"("applicationId");

  CREATE TABLE IF NOT EXISTS "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Tag_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User" ("id")
      ON DELETE CASCADE ON UPDATE CASCADE
  );

  CREATE UNIQUE INDEX IF NOT EXISTS "Tag_userId_name_key"
    ON "Tag"("userId", "name");

  CREATE TABLE IF NOT EXISTS "ApplicationTag" (
    "applicationId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    PRIMARY KEY ("applicationId", "tagId"),
    CONSTRAINT "ApplicationTag_applicationId_fkey"
      FOREIGN KEY ("applicationId") REFERENCES "Application" ("id")
      ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ApplicationTag_tagId_fkey"
      FOREIGN KEY ("tagId") REFERENCES "Tag" ("id")
      ON DELETE CASCADE ON UPDATE CASCADE
  );
`);

ensureColumn("User", "passwordHash", "TEXT");

db.close();

console.log(`Bootstrapped SQLite schema at ${dbPath}`);
