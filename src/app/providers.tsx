"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Client-side auth helpers such as signOut read session context from here.
  return <SessionProvider>{children}</SessionProvider>;
}
