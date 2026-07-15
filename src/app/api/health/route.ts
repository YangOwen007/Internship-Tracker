import { NextResponse } from "next/server";

export async function GET() {
  // This lightweight endpoint is useful for deployment smoke tests and later
  // for uptime monitoring, without exposing config details to anonymous callers.
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
