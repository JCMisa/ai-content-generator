"use client";

import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import ButtomNav from "./_components/ButtomNav";
import { TotalUsageContext } from "../(context)/TotalUsageContext";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [show, setShow] = useState<boolean>(true);

  const showSideNav = () => {
    setShow((prev) => !prev);
  };

  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [upgraded, setUpgraded] = useState<boolean>(false);

  return (
    <TotalUsageContext.Provider
      value={{ totalUsage, setTotalUsage, upgraded, setUpgraded }}
    >
      <div className="">
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
    </TotalUsageContext.Provider>
  );
};

export default DashboardLayout;
