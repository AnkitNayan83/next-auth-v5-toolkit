import nodemailer from "nodemailer";

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD!;
const EMAIL = process.env.EMAIL!;
const domain = process.env.NEXT_PUBLIC_APP_URL!;

const trnasporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
    },
});

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `${domain}/auth/verify?token=${token}`;

    await trnasporter.sendMail({
        from: `nextauth-toolkit <${EMAIL}>`,
        to: email,
        subject: "Verify your email",
        html: `<p> Click the following link to verify your email <a href="${confirmationLink}"> Verify Email </a> </p>`,
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await trnasporter.sendMail({
        from: `nextauth-toolkit <${EMAIL}>`,
        to: email,
        subject: "Reset your password",
        html: `<p> Click the following link to reset your password <a href="${resetLink}"> Reset Password </a> </p>`,
    });
};

export const sendTwoFactorToken = async (email: string, token: string) => {
    await trnasporter.sendMail({
        from: `nextauth-toolkit <${EMAIL}>`,
        to: email,
        subject: "Two Factor Authentication",
        html: `<div> <p>Your two factor authentication token is <b>${token}</b></p> <p>This OPT is valid for 10 miniutes only. Do not share this token with anyone.</p> </div>`,
    });
};
