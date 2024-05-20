import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `http://localhost:3000/auth/verify?token=${token}`;

    await resend.emails.send({
        from: "NextAuth-Toolkit <onboarding@resend.dev>",
        to: email,
        subject: "Verify your email",
        html: `<p> Click the following link to verify your email <a href="${confirmationLink}"> Verify Email </a> </p>`,
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "NextAuth-Toolkit <onboarding@resend.dev>",
        to: email,
        subject: "Reset your password",
        html: `<p> Click the following link to reset your password <a href="${resetLink}"> Reset Password </a> </p>`,
    });
};

export const sendTwoFactorToken = async (email: string, token: string) => {
    await resend.emails.send({
        from: "NextAuth-Toolkit <onboarding@resend.dev>",
        to: email,
        subject: "Two Factor Authentication",
        html: `<div> <p>Your two factor authentication token is <b>${token}</b></p> <p>This OPT is valid for 10 miniutes only. Do not share this token with anyone.</p> </div>`,
    });
};
