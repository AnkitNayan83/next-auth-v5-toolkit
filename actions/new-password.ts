"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) {
        return { error: "Missing token!" };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid password" };
    }

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return { error: "Invalid token" };
    }

    const hasExpired = new Date() > new Date(existingToken.expires);

    if (hasExpired) {
        return { error: "Token has expired" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "No user found with this email" };
    }

    const { password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            hashedPassword,
        },
    });

    await db.passwordResetToken.deleteMany({
        where: { id: existingToken.id },
    });

    return { success: "Password changed successfully" };
};
