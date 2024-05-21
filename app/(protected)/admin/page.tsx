"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
    const handelApiclikc = async () => {
        fetch("/api/admin").then((response) => {
            if (response.ok) {
                console.log("OK");
                toast.success("You are admin");
            } else {
                console.log("Forbidden");
                toast.error("Unauthorized");
            }
        });
    };

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">🗝️ Admin</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are an admin" />
                </RoleGate>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-semibold">Admin only api route</p>
                    <Button onClick={handelApiclikc}>Click to test</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminPage;
