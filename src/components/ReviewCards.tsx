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
  const {
    data: cartData,
    error,
    isLoading,
  } = useSWR(boxId ? `/cards/review?box_id=${boxId}` : null);
  const cards = cartData?.data || [];

  if (!boxId) return <p className="text-center">لطفاً یک جعبه انتخاب کنید</p>;

  if (isLoading) return <LoadingModal />;

  if (error) return <p className="text-red-500">{error}</p>;

  if (cards.length === 0) return <p>هیچ کارتی برای مرور وجود ندارد</p>;

  console.log("cards", cards);

  return (
    <Card className="m-4">
      <CardDescription className="m-4">مرور کارت‌ها</CardDescription>
      <CardContent>
        {cards.map((card: CardType) => (
          <CardComponent
            key={card.id}
            card={card}
            boxId={boxId}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ReviewCards;
