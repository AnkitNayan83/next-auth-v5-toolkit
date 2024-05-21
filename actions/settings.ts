"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized" };

    const existingUser = await db.user.findUnique({
        where: {
            id: user.id,
        },
    });

    if (!existingUser) {
        return { error: "User not found" };
    }

    if (user.isOAuth) {
        values.email = undefined;
        values.hashedPassword = undefined;
        values.newPassword = undefined;
        values.isTwofactorEnabled = undefined;
    }

    if (values.email && values.email !== existingUser.email) {
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== existingUser.id) {
            return { error: "Email already exists" };
        }

        const verificationToken = await generateVerificationToken(values.email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { success: "Verification email sent!" };
    }

    if (values.hashedPassword && values.newPassword && existingUser.hashedPassword) {
        const isPasswordMatch = await bcrypt.compare(
            values.hashedPassword,
            existingUser.hashedPassword
        );

        if (!isPasswordMatch) {
            return { error: "Invalid password" };
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10);
        values.hashedPassword = hashedPassword;
        values.newPassword = undefined;
    }

    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            ...values,
        },
    });

    return { success: "Settings updated" };
};
