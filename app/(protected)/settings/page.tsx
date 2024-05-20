"use client";

// Using user session in the client component
// Wrap your layout with session provider then use the usesession hook

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const page = () => {
    const user = useCurrentUser();

    return (
        <div className="bg-white p-10 rounded-xl">
            <Button onClick={() => logout()}>Sign Out</Button>
        </div>
    );
};

export default page;
