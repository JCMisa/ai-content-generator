"use client";

import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import ButtomNav from "./_components/ButtomNav";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [show, setShow] = useState<boolean>(true);

  const showSideNav = () => {
    setShow((prev) => !prev);
  };

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav isShow={show} />
      </div>
      <div className={`${show ? "md:ml-64" : ""} transition-all`}>
        <DashboardHeader showSideNav={showSideNav} />
        {children}
      </div>
      <div className="fixed block md:hidden w-full bottom-0">
        <ButtomNav />
      </div>
    </div>
  );
};

export default DashboardLayout;
