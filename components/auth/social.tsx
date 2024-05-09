"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Social() {
    const handelSignIn = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
    };

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size={"lg"}
                variant={"outline"}
                className="w-full"
                onClick={() => handelSignIn("google")}
            >
                <FcGoogle />
            </Button>
            <Button
                size={"lg"}
                variant={"outline"}
                className="w-full"
                onClick={() => handelSignIn("github")}
            >
                <FaGithub />
            </Button>
        </div>
    );
}
