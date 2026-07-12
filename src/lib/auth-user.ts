import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
}

export async function requireCurrentUser() {
  // Centralizing the auth check keeps pages and server actions consistent and
  // makes future access-control changes much easier to apply.
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
