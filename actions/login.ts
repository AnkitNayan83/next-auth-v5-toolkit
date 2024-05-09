"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";
import bcrypt from "bcryptjs";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid Field" };
    }

    const { email, password } = validatedFields.data;

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

        return { success: "Confirmation email sent!" };
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
