import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Auth Toolkit",
    description:
        "Auth toolkit is an application which is made to help you in your authentication process.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body className={font.className}>
                    <Toaster />
                    {children}
                </body>
            </html>
        </SessionProvider>
    );
}
