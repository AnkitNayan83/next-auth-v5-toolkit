import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

// to add edge support fot prisma

export default {
    providers: [
        Google,
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);

                    if (!user || !user.hashedPassword) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

                    if (passwordMatch) {
                        return user;
                    }
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
