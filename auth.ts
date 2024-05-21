import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },

    // allows you to perfom certain actions for a certain event
    events: {
        // when a new account is linked using oAuth
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id! },
                data: { emailVerified: new Date() },
            });
        },
    },

    // What action will be performed after a certain event happens like signIn ...
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id!);

            if (!existingUser?.emailVerified) {
                return false;
            }

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
                    existingUser.id
                );

                if (!twoFactorConfirmation) return false;

                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id },
                });
            }

            return true;
        },

        // To extend the session you have to return JWT token first
        async session({ session, token }) {
            // console.log({ "Session Token": { token }, session });
            // if (session.user) {
            //     session.user.customField = token.customField;
            // }
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role;
            }

            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
            }

            if (session.user && token.email) {
                session.user.name = token.name;
                session.user.email = token.email;
            }

            if (session.user) {
                session.user.isOAuth = token.isOAuth;
            }

            return session;
        },
        async jwt({ token }) {
            // console.log({ token });
            // token.customField = "Ankit";
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id);

            token.isOAuth = !!existingAccount;

            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
