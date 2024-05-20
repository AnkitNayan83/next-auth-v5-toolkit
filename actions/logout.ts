"use server";

import { signOut } from "@/auth";

export const logout = async () => {
    // by this way you can perform some action befor signout and also it seperates sigout from js bundel
    await signOut();
};
