"use client";
import React from "react";
import useSWR from "swr";
import LoadingModal from "./MainComponents/LoadingModal";
import { Card, CardContent, CardDescription } from "./ui/card";
import { useBoxStore } from "@/store/boxStore";
import CardComponent from "./CardComponent";
import { CardType } from "../../type";

const ReviewCards = () => {
  const { boxId } = useBoxStore();
  const { data: cartData, error, isLoading } = useSWR(
    boxId ? `/cards/review?box_id=${boxId}` : null
  );

  if (!boxId)
    return <p className="text-center">لطفاً یک جعبه انتخاب کنید</p>;

  if (isLoading) return <LoadingModal />;
  if (error) return <p className="text-red-500">{error}</p>;

  const cards = cartData?.data || [];

  if (cards.length === 0 && boxId !== 6) {
    return (
      <div className="flex justify-center items-center">
        <p>هیچ کارتی برای مرور وجود ندارد</p>
      </div>
    );
  }

  if (boxId === 6) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-center">
          کارت‌های این جعبه به‌طور کامل مرور شده‌اند و شما می‌توانید آن‌ها را به
          صورت اکسل ذخیره و حذف کنید.
        </p>
      </div>
    );
  }

  return (
    <Card className="m-4">
      <CardDescription className="m-4">مرور کارت‌ها</CardDescription>
      <CardContent>
        {cards.map((card: CardType) => (
          <CardComponent key={card.id} card={card} boxId={boxId} />
        ))}
      </CardContent>
    </Card>
  );
};

export default ReviewCards;
