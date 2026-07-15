import "dotenv/config";

export const DEFAULT_POSTGRES_DATABASE_URL =
  "postgresql://postgres:postgres@localhost:5432/internship_tracker?schema=public";

export function getDatabaseUrl() {
  if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set in production.");
  }

  return process.env.DATABASE_URL ?? DEFAULT_POSTGRES_DATABASE_URL;
}
