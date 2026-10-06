import { getDatabaseUrl } from "@/lib/database-config";

// Integration tests create/delete fixture users. Never point them at hosted data.
const target = new URL(getDatabaseUrl());
if (!["localhost", "127.0.0.1", "[::1]"].includes(target.hostname)) {
  throw new Error("Database tests require a loopback PostgreSQL database.");
}
