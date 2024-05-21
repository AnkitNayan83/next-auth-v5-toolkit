"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

interface RoleGateProps {
    allowedRole: UserRole;
    children: React.ReactNode;
}

export const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return <FormError message="You don't have permission to access this page." />;
    }

    return <>{children}</>;
};
