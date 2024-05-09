import { CardWrapper } from "./card-wrapper";
import { ShieldAlert } from "lucide-react";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! Something went wrong"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center justify-center w-full">
                <ShieldAlert className="text-destructive" />
            </div>
        </CardWrapper>
    );
};
