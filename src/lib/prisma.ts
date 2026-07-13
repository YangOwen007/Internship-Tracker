import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { getDatabaseUrl } from "@/lib/database-config";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    // Prisma 7 expects a driver adapter at runtime, so the shared client is
    // created against the configured PostgreSQL connection string here.
    const adapter = new PrismaPg({
      connectionString: getDatabaseUrl(),
    });

    return new PrismaClient({ adapter });
  })();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
