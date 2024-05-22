import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
import { currentUser } from "@/lib/auth";
import Link from "next/link";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export default async function Home() {
    const user = await currentUser();
    return (
        <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <div className="space-y-6 text-center">
                <h1
                    className={cn(
                        "text-6xl font-semibold text-white drop-shadow-md",
                        font.className
                    )}
                >
                    🔐 Auth
                </h1>
                <p className="text-white text-lg">A simple authentication service</p>

                <div>
                    {user ? (
                        <div>
                            <Button variant={"secondary"} asChild>
                                <Link href={"/server"}>View your info</Link>
                            </Button>
                        </div>
                    ) : (
                        <LoginButton>
                            <Button variant={"secondary"} className="font-bold">
                                Sign in
                            </Button>
                        </LoginButton>
                    )}
                </div>
            </div>
        </main>
    );
}
