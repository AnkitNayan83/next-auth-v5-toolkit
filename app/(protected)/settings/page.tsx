import { auth, signOut } from "@/auth"; //for server components import from @/auth
import { Button } from "@/components/ui/button";
const page = async () => {
    const session = await auth();

    return (
        <div>
            <h1 className="text-2xl font-bold">{JSON.stringify(session)}</h1>
            {
                // for server components
            }
            <form
                action={async () => {
                    "use server";

                    await signOut();
                }}
            >
                <Button>Sign Out</Button>
            </form>
        </div>
    );
};

export default page;
