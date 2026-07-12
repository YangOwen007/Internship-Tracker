import "dotenv/config";

export const DEFAULT_SQLITE_DATABASE_URL = "file:./prisma/dev.db";

export function getDatabaseUrl() {
  return process.env.DATABASE_URL ?? DEFAULT_SQLITE_DATABASE_URL;
}

export function getDatabaseMode(url = getDatabaseUrl()) {
  return isSqliteDatabaseUrl(url) ? "sqlite" : "postgresql";
}

export function isSqliteDatabaseUrl(url = getDatabaseUrl()) {
  return url.startsWith("file:");
}

export function getSqliteDatabasePath(url = getDatabaseUrl()) {
  return isSqliteDatabaseUrl(url) ? url.slice(5) : url;
}

export function assertSqliteDatabaseUrl(context: string) {
  const databaseUrl = getDatabaseUrl();

  if (!isSqliteDatabaseUrl(databaseUrl)) {
    throw new Error(
      `${context} currently only supports SQLite URLs. PostgreSQL migration prep is in place, but the final Prisma provider switch has not happened yet.`,
    );
  }

  return databaseUrl;
}
