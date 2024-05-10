"use client";

import { Loader } from "lucide-react";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { verify } from "@/actions/verify";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const VerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [isPending, startTransistion] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const onSubmit = useCallback(async () => {
        if (!token) return;
        startTransistion(() => {
            verify(token)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
                .catch(() => {
                    setError("Something went wrong. Please try again later");
                });
        });
    }, [token]);

    //it will call twice because of react.strict but only in development mode not in production.
    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your account"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            {isPending && (
                <>
                    <div className="flex items-center w-full justify-center mb-2">
                        <Loader className="w-6 h-6 text-gray-500 animate-spin ease" />
                    </div>
                </>
            )}
            {!success && <FormError message={error} />}
            <FormSuccess message={success} />
        </CardWrapper>
    );
};
