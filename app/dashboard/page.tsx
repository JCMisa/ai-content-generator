"use client";

import React, { useState } from "react";
import SearchSection from "./_components/SearchSection";
import TemplateListSection from "./_components/TemplateListSection";

const Dashboard = () => {
  const [userSearchInput, setUserSearchInput] = useState<string | any>();

  return (
    <div className="p-5 mb-9 md:mb-0 bg-dark-200 h-full rounded-lg">
      {/* Search section */}
      <SearchSection
        onSearchInput={(value: string) => setUserSearchInput(value)}
      />

      {/* template list section */}
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
};

export default Dashboard;
