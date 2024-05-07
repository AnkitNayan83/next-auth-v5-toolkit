"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

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

    return { success: "Account created" };
};
