import { NextResponse } from "next/server";
import { getDatabaseMode } from "@/lib/database-config";

export async function GET() {
  // This lightweight endpoint is useful for deployment smoke tests and later
  // for uptime monitoring, without exposing private app data.
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    databaseMode: getDatabaseMode(),
    authConfigured: Boolean(process.env.NEXTAUTH_SECRET),
  });
}
