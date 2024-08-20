import { Search } from "lucide-react";
import React from "react";

const SearchSection = ({ onSearchInput }: any) => {
  return (
    <div className="p-10 linear-bg flex flex-col justify-center items-center rounded-lg">
      <h2 className="text-3xl font-bold">Browse All Templates</h2>
      <p className="text-white">What would you like to create today?</p>
      <div className="w-full flex justify-center">
        <div className="flex gap-2 items-center p-2 border rounded-md bg-dark mt-5 w-[50%]">
          <Search className="text-light" />
          <input
            onChange={(e) => onSearchInput(e.target.value)}
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none focus:ring-0 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
