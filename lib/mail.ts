import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `http://localhost:3000/auth/verify?token=${token}`;

    await resend.emails.send({
        from: "NextAuth-Toolkit <onboarding@resend.dev>",
        to: [email],
        subject: "Verify your email",
        html: `<p> Click the following link to verify your email <a href="${confirmationLink}"> Verify Email </a> </p>`,
    });
};
