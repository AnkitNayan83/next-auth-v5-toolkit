"use client";

import { Card, CardFooter, CardHeader, CardContent } from "../ui/card";
import { Backbutton } from "./back-button";
import { Header } from "./haeder";
import Social from "./social";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>

            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <Backbutton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    );
};
