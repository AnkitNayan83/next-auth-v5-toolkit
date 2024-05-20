"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { sendTwoFactorToken, sendVerificationEmail } from "@/lib/mail";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid Field" };
    }

    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.hashedPassword) {
        return { error: "Invalid email or password" };
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.hashedPassword);

    if (!passwordMatch) {
        return { error: "Invalid email or password" };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { success: "Confirmation email sent!" };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const towFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

            if (!towFactorToken) {
                return { error: "Invalid OTP" };
            }

            if (towFactorToken.token !== code) {
                return { error: "Invalid OTP" };
            }

            const hasExpired = new Date(towFactorToken.expires) < new Date();

            if (hasExpired) {
                return { error: "Token has expired" };
            }

            await db.twoFactorToken.delete({
                where: {
                    id: towFactorToken.id,
                },
            });
            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id,
                    },
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                },
            });
        } else {
            const twoFactorToken = await generateTwoFactorToken(email);

            await sendTwoFactorToken(email, twoFactorToken.token);

            return { towFactor: true };
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
        return { success: "Logged in Successfully" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password" };
                case "AccessDenied":
                    return { error: "Email not verified" };
                default:
                    return { error: "Something went wrong" };
            }
        }

        throw error; // instructed by nextjs
    }
};
