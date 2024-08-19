import { UserButton } from "@clerk/nextjs";
import { AlignJustify, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PropTypes {
  showSideNav: () => void;
}

const DashboardHeader = ({ showSideNav }: PropTypes) => {
  return (
    <div className="p-5 shadow-md border-b flex justify-between items-center">
      <div className="md:flex flex-row gap-5 items-center hidden">
        <div className="cursor-pointer">
          <AlignJustify onClick={showSideNav} />
        </div>
        <div className="flex flex-row gap-3 items-center border border-light px-5 rounded-lg">
          <Search />
          <input
            type="text"
            placeholder="Search..."
            className="text-light bg- p-2 bg-dark focus:outline-none focus:ring-0"
          />
        </div>
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
