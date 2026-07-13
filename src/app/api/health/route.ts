import { NextResponse } from "next/server";
import { getDatabaseUrl } from "@/lib/database-config";

export async function GET() {
  // This lightweight endpoint is useful for deployment smoke tests and later
  // for uptime monitoring, without exposing private app data.
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    databaseMode: getDatabaseUrl().startsWith("postgresql:")
      ? "postgresql"
      : "unknown",
    authConfigured: Boolean(process.env.NEXTAUTH_SECRET),
  });
}
