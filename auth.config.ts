import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

// to add edge support fot prisma

export default { providers: [Google] } satisfies NextAuthConfig;
