import "dotenv/config";

export const DEFAULT_POSTGRES_DATABASE_URL =
  "postgresql://postgres:postgres@localhost:5432/internship_tracker?schema=public";

export function getDatabaseUrl() {
  return process.env.DATABASE_URL ?? DEFAULT_POSTGRES_DATABASE_URL;
}
