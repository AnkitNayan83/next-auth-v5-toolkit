"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "@/auth";

export default function Social() {
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size={"lg"}
                variant={"outline"}
                className="w-full"
                onClick={() => signIn("google")}
            >
                <FcGoogle />
            </Button>
            <Button size={"lg"} variant={"outline"} className="w-full" onClick={() => {}}>
                <FaGithub />
            </Button>
        </div>
    );
}
