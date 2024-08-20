"use client";

import Templates from "@/app/(data)/Templates";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

interface PropTypes {
  userSearchInput: string;
}

const TemplateListSection = ({ userSearchInput }: PropTypes) => {
  const [templateList, setTemplateList] = useState(Templates);

  useEffect(() => {
    if (userSearchInput) {
      const filterData = Templates.filter(
        (item) =>
          item.name.toLowerCase().includes(userSearchInput.toLowerCase()) ||
          item.desc.toLowerCase().includes(userSearchInput.toLowerCase()) ||
          item.category.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplateList(filterData);
    } else {
      setTemplateList(Templates);
    }
  }, [userSearchInput]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
      {templateList.map((item: TEMPLATE, index: number) => (
        <TemplateCard {...item} />
      ))}
    </div>
  );
};

export default TemplateListSection;
