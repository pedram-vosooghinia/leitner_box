"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import useSWR from "swr";
import LoadingModal from "./MainComponents/LoadingModal";
import { Box } from "@/types/box";
import { useBoxStore } from "@/store/boxStore";
import useUserStore from "@/store/userStore";
import ClientOnly from "@/components/ClientOnly";

const BoxContent = () => {
  const { boxId, setBoxId } = useBoxStore();
  const { user } = useUserStore();

  const {
    data: boxData,
    error,
    isLoading,
  } = useSWR(user?.id ? `/boxes/get?userId=${user.id}` : null);
  const boxes: Box[] = boxData?.data || [];

  if (isLoading) return <LoadingModal />;
  if (error) return <p className="text-red-500">خطا در دریافت اطلاعات</p>;

  return (
    <Card className="m-4">
      <CardContent>
        <div className="text-2xl font-bold text-center my-4">Leitner Box</div>
        <Card className="flex justify-between flex-wrap">
          {boxes.map((box: Box) => (
            <CardContent
              key={box.id}
              className={`flex flex-col items-center w-32 m-2 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer ${
                boxId === box.id ? "bg-red-500" : "bg-slate-300"
              }`}
              onClick={() => setBoxId(box.id)}
            >
              <h2 className="text-lg">جعبه {box.box_number}</h2>
              <p>پارت‌ها: {box.total_parts}</p>
              <p>کارت‌ها: {box.card_count}</p>
            </CardContent>
          ))}
        </Card>
      </CardContent>
    </Card>
  );
};

const BoxList = () => {
  return (
    <ClientOnly>
      <BoxContent />
    </ClientOnly>
  );
};

export default BoxList;
