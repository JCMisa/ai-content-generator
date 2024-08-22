"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

const UsageTrack = () => {
  const { user } = useUser();

  const [totalUsage, setTotalUsage] = useState<number>(0);

  const getTotalUsage = async () => {
    let total = 0;

    const result = await db
      .select()
      .from(AIOutput)
      .where(
        eq(
          AIOutput?.createBy,
          user?.primaryEmailAddress?.emailAddress as string
        )
      );

    if (result) {
      result.forEach((element: any) => {
        total = total + Number(element?.aiResponse?.length);
      });

      console.log("total: ", total);
      setTotalUsage(total);
    }
  };

  useEffect(() => {
    user && getTotalUsage();
  }, [user]);

  return (
    <div className="m-5">
      <div className="bg-dark-200 text-white rounded-lg p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Credits</h2>
          <Button
            variant={"outline"}
            size={"sm"}
            className="text-primary-100 border-primary-100 hover:bg-primary-100 hover:text-light-100"
            onClick={() => getTotalUsage()}
          >
            Refresh
          </Button>
        </div>

        <div className="h-2 bg-dark-100 w-full rounded-full mt-3">
          <div
            className="h-2 bg-primary rounded-full"
            style={{ width: (totalUsage / 10000) * 100 + "%" }}
          ></div>
        </div>
        <h2 className="text-xs my-2">{totalUsage}/10,000 credits used</h2>
      </div>
      <Button className="w-full my-3">Upgrade</Button>
    </div>
  );
};

export default UsageTrack;
