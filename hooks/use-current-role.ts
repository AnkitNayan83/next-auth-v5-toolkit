import { useSession } from "next-auth/react";

/**
 * Returns the role of the current user from the session data for the client components.
 *
 * @return {User | undefined} The current user object if available, otherwise undefined.
 */
export const useCurrentRole = () => {
    const session = useSession();
    return session.data?.user?.role;
};
