import { auth } from "@/auth";

/**
 * Returns the current user for server components.
 *
 * @return {Promise<any>} A promise that resolves to the current user, or `undefined` if the session is not available.
 */
export const currentUser = async () => {
    const session = await auth();
    return session?.user;
};

export const currentRole = async () => {
    const session = await auth();
    return session?.user?.role;
};
