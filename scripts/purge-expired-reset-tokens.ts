import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  try {
    // Expired tokens cannot authorize a reset. This predicate leaves active
    // recovery links, accounts, and application records untouched.
    const result = await prisma.passwordResetToken.deleteMany({
      where: { expiresAt: { lte: new Date() } },
    });
    console.log(`Deleted ${result.count} expired password-reset record(s).`);
  } catch {
    console.error("Expired reset-token cleanup failed; check database availability.");
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void main();
