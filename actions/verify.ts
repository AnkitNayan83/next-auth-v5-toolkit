"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

// In development mode this function is called twice because of react.strict thats why this function will show invalid token but it will work in production.
export const verify = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: "Invalid token" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "User does not exist with this email" };
    }

    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email, // if user updates his email then this action can be used
        },
    });

    await db.verificationToke.delete({
        where: {
            id: existingToken.id,
        },
    });

    return { success: "Email verified successfully." };
};
