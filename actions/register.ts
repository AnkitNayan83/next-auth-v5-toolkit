"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs"; //use bcryptjs as bcrypt has error
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid Field" };
    }

    const { email, name, password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userEmailCheck = await getUserByEmail(email);

    if (userEmailCheck) {
        return { error: "Email already exists. Please login if this is your email" };
    }

    await db.user.create({
        data: {
            email,
            hashedPassword,
            name,
        },
    });

    const Verificationtoken = await generateVerificationToken(email);

    await sendVerificationEmail(Verificationtoken.email, Verificationtoken.token);

    return { success: "Confirmation token sent to your email" };
};
