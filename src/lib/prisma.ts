import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";
import {
  getDatabaseMode,
  assertSqliteDatabaseUrl,
} from "@/lib/database-config";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    // SQLite still uses the adapter-based path for local reliability, but the
    // shared Prisma client can now fall back to a standard connection-string
    // setup when we complete the PostgreSQL provider switch.
    if (getDatabaseMode() === "sqlite") {
      const adapter = new PrismaBetterSqlite3({
        url: assertSqliteDatabaseUrl("src/lib/prisma.ts"),
      });

      return new PrismaClient({ adapter });
    }

    return new PrismaClient(
      {} as ConstructorParameters<typeof PrismaClient>[0],
    );
  })();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
