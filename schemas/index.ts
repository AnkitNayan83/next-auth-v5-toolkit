import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
    .object({
        name: z.optional(z.string().min(1, { message: "Name cannot be empty" })),
        email: z.optional(z.string().email({ message: "Invalid email" })),
        isTwofactorEnabled: z.optional(z.boolean()),
        role: z.enum([UserRole.USER, UserRole.ADMIN]),
        hashedPassword: z.optional(z.string().min(6, { message: "Old Password is required" })),
        newPassword: z.optional(z.string().min(6, { message: "New Password is required" })),
    })
    .refine(
        (data) => {
            if (data.hashedPassword && !data.newPassword) {
                return false;
            }

            if (!data.hashedPassword && data.newPassword) {
                return false;
            }

            return true;
        },
        {
            message: "Both password fields are required",
            path: ["newPassword"],
        }
    );

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, { message: "Password is required" }),

    code: z.optional(z.string()),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, { message: "Minimum 6 chareters required" }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, { message: "Minimum 6 chareters required" }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});
