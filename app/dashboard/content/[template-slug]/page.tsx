"use client";

import React, { useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { chatSession } from "@/utils/AiModal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { toast } from "sonner";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

const CreateNewContent = (props: PROPS) => {
  const router = useRouter();
  const { user } = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [aiOutput, setAiOutput] = useState<string>("");

  const selectedTemplate: TEMPLATE | any = Templates?.find(
    (item) => item.slug === props.params["template-slug"]
  );

  const generateAiContent = async (formData: any) => {
    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const finalAiPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

    const result = await chatSession.sendMessage(finalAiPrompt);
    setAiOutput(result.response.text());
    await saveInDb(
      formData,
      selectedTemplate?.slug,
      result.response.text(),
      selectedTemplate?.name,
      selectedTemplate?.icon
    );
    setLoading(false);
  };

  const saveInDb = async (
    formData: any,
    slug: any,
    aiResp: string,
    title: string,
    icon: string
  ) => {
    setLoading(true);
    try {
      const result = await db.insert(AIOutput).values({
        formData: formData,
        aiResponse: aiResp,
        templateSlug: slug,
        title: title,
        icon: icon,
        createBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("MM-DD-yyyy"),
      });

      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Content saved successfully!
          </p>
        );
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while saving the content.
        </p>
      );
    } finally {
      setLoading(false);
    }
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
          loading={loading}
        />

        {/* output section */}
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
