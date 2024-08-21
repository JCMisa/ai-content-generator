"use client";

import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { LoaderCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const History = () => {
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [contentList, setContentList] = useState<any>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const getAllContent = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(AIOutput)
        .where(
          eq(
            AIOutput?.createBy,
            user?.primaryEmailAddress?.emailAddress as string
          )
        )
        .orderBy(desc(AIOutput?.id));

      if (result) {
        setContentList(result);
        console.log("content list: ", result);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-red-500 text-sm">
          Internal error occured while fetching contents
        </p>
      );
      console.log("content list error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && getAllContent();
  }, [user]);

  const deleteContent = async (content: any) => {
    setLoading(true);
    try {
      const result = await db
        .delete(AIOutput)
        .where(eq(AIOutput?.id, content?.id));

      if (result) {
        toast(
          <p className="font-bold text-green-500 text-sm">
            Content deleted successfully
          </p>
        );
        getAllContent();
      }
    } catch (error) {
      toast(
        <p className="font-bold text-red-500 text-sm">
          Internal error occured while deleting content
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (aiResponse: string) => {
    navigator.clipboard.writeText(aiResponse); // put te text on device clipboard
    setCopied(true);
  };

  return (
    <div className="p-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl text-light font-bold">History</h2>
        <p className="text-sm text-gray-400">
          Search your previously generated AI contents
        </p>
      </div>

      {contentList.length == 0 ? (
        <div className="mt-10">
          <div className="grid grid-cols-7 bg-dark-200 p-2 mt-3 min-h-16 animate-pulse">
            <h2 className="font-bold"></h2>
            <h2 className="font-bold col-span-2"></h2>
            <h2 className="font-bold"></h2>
            <h2 className="font-bold"></h2>
            <h2 className="flex justify-center items-center font-bold"></h2>
            <h2 className="flex justify-center items-center font-bold"></h2>
          </div>

          <div className="min-h-80 overflow-x-hidden overflow-y-auto card-scroll bg-dark-200 mt-2 animate-pulse"></div>
        </div>
      ) : (
        <div className="mt-3">
          <div className="grid grid-cols-8 linear-bg p-2 mt-3">
            <h2 className="font-bold col-span-2">TEMPLATE</h2>
            <h2 className="font-bold col-span-2">AI RESP</h2>
            <h2 className="font-bold">DATE</h2>
            <h2 className="font-bold">WORDS</h2>
            <h2 className="flex justify-center items-center font-bold">COPY</h2>
            <h2 className="flex justify-center items-center font-bold">
              DELETE
            </h2>
          </div>

          <div className="max-h-80 overflow-x-hidden overflow-y-auto card-scroll">
            {contentList &&
              contentList.map((content: any, index: number) => (
                <div
                  className="grid grid-cols-8 bg-dark-200 p-2"
                  key={content?.id || index}
                >
                  <div className="flex flex-row gap-2 items-center mr-4 col-span-2">
                    <Image
                      src={content?.icon}
                      alt="icon"
                      width={20}
                      height={20}
                    />
                    <h2
                      onClick={() =>
                        router.push(
                          `/dashboard/content/${content?.templateSlug}`
                        )
                      }
                      className="cursor-pointer underline"
                    >
                      {content?.title}
                    </h2>
                  </div>

                  <h2 className="max-h-20 overflow-y-auto overflow-x-hidden card-scroll mr-4 col-span-2">
                    {content?.aiResponse}
                  </h2>
                  <h2 className="flex items-center">{content?.createdAt}</h2>
                  <h2 className="flex items-center justify-center">
                    {content?.aiResponse ? content.aiResponse.length : 0}
                  </h2>
                  <h2
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => handleCopy(content?.aiResponse)}
                  >
                    {copied ? (
                      <h2 className="text-green-500">Copied</h2>
                    ) : (
                      <h2 className="text-light">Copy</h2>
                    )}
                  </h2>
                  <div className="flex justify-center items-center cursor-pointer">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Trash
                          className="text-red-500 hover:text-red-200 hover:scale-125"
                          width={14}
                          height={14}
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your AI generated content.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteContent(content)}
                            className="bg-red-500 hover:bg-red-700"
                          >
                            {loading ? (
                              <LoaderCircle className="animate-spin" />
                            ) : (
                              "Delete"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
