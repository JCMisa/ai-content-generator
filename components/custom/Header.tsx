"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between items-center border shadow-md">
      <Link href={"/"}>
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src={"/logo.svg"} alt="logo" width={60} height={60} />
          <p className="text-xl font-bold sm:block hidden text-light">
            Ide<span className="logo-text">AI</span>
          </p>
        </div>
      </Link>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={"/dashboard"}>
          <Button className="text-light-100 linear-bg">Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;