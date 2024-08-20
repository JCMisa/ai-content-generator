"use client";

import React from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

const CreateNewContent = (props: PROPS) => {
  const router = useRouter();

  const selectedTemplate: TEMPLATE | any = Templates?.find(
    (item) => item.slug === props.params["template-slug"]
  );

  const generateAiContent = (formData: any) => {
    // todo: generate ai response based on user form input
  };

  return (
    <div className="p-5 mb-7 md:mb-0 bg-dark-200 h-full rounded-lg">
      <Button
        onClick={() => router.replace("/dashboard")}
        className="mb-5 flex flex-row gap-2 items-center"
      >
        <ArrowLeft /> Back
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* form section */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => generateAiContent(v)}
        />

        {/* output section */}
        <div className="col-span-2">
          <OutputSection />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
