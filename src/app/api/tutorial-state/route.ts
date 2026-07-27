import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { updateUserTutorialState } from "@/lib/user-account-store";

const tutorialStateSchema = z.object({
  state: z.enum(["SKIPPED", "COMPLETED"]),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        error: "Unauthorized.",
      },
      {
        status: 401,
      },
    );
  }

  const body = await request.json().catch(() => null);
  const parsedBody = tutorialStateSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: "Invalid tutorial state.",
      },
      {
        status: 400,
      },
    );
  }

  await updateUserTutorialState(session.user.id, parsedBody.data.state);

  return NextResponse.json({
    ok: true,
  });
}
