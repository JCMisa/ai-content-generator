import { UserButton } from "@clerk/nextjs";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PropTypes {
  showSideNav: () => void;
}

const DashboardHeader = ({ showSideNav }: PropTypes) => {
  return (
    <div className="p-5 shadow-md border-b flex justify-between items-center">
      <div className="hidden md:block cursor-pointer">
        <AlignJustify onClick={showSideNav} />
      </div>

      <Link href={"/"}>
        <div className="flex font-medium items-center text-white mb-4 md:mb-0 md:hidden">
          <Image src={"/logo.svg"} alt="logo" width={25} height={25} />
          <p className="ml-3 text-xl text-light">
            Ide<span className="logo-text">AI</span>
          </p>
        </div>
      </Link>

      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default DashboardHeader;
