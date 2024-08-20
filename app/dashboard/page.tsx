import React from "react";
import SearchSection from "./_components/SearchSection";
import TemplateListSection from "./_components/TemplateListSection";

const Dashboard = () => {
  return (
    <div className="p-5 mb-7">
      {/* Search section */}
      <SearchSection />

      {/* template list section */}
      <TemplateListSection />
    </div>
  );
};

export default Dashboard;
