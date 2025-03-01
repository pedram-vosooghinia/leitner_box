"use client";
import React from "react";
import useSWR from "swr";
import LoadingModal from "./MainComponents/LoadingModal";
import { Card, CardContent, CardDescription } from "./ui/card";
import { useBoxStore } from "@/store/boxStore";
import CardComponent from "./CardComponent";
import { CardType } from "@/types/card";
import useUserStore from "@/store/userStore";
const ReviewCards = () => {
  const { boxId } = useBoxStore();
  const { user } = useUserStore();
  const {
    data: cartData,
    error,
    isLoading,
  } = useSWR(boxId ? `/cards/review?box_id=${boxId}&userId=${user?.id}` : null);

  if (!boxId)
    return (
      <div className="text-center">
        <p>لطفاً یک جعبه انتخاب کنید</p>
      </div>
    );

  if (isLoading) return <LoadingModal />;
  if (error) return <div className="text-red-500">{error}</div>;

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
          کارت‌های این جعبه به‌طور کامل مرور شده‌اند
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
