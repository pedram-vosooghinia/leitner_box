"use client";
import React from "react";
import useSWR, { mutate } from "swr";
import { useBoxStore } from "@/store/boxStore";
import { Button } from "./ui/button";
import { moveCardsService } from "@/services/cards";
import toast from "react-hot-toast";
import LoadingModal from "./MainComponents/LoadingModal";

const MoveCards = () => {
  const { boxId } = useBoxStore();
  const { data: moveData, isLoading } = useSWR(
    boxId ? `/cards/move/checkMove?box_id=${boxId}` : null
  );

  const handleMove = async () => {
    try {
      await moveCardsService({ box_id: boxId });
      mutate(`/cards/move/checkMove?box_id=${boxId}`);
      mutate(`/cards/review?box_id=${boxId}`);
      mutate(`/boxes/get`);
      toast.success("کارت‌ها با موفقیت انتقال داده شدند");
    } catch {
      toast.error("ارتباط با سرور قطع شد");
    }
  };

  if (isLoading) return <LoadingModal />;
  if (!moveData?.success) return null;

  return (
    <div className="flex justify-center items-center">
      <Button onClick={handleMove} className="text-center">
        انتقال کارت‌ها به جلو
      </Button>
    </div>
  );
};

export default MoveCards;
