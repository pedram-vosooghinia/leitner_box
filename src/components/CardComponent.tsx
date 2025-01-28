import React, { useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

import { updateCardsService } from "@/services/cards";
import { CardType } from "../../type";
import { mutate } from "swr";
interface CardComponentProps {
  card: CardType;
  boxId: number;
}

const CardComponent: React.FC<CardComponentProps> = ({ card, boxId }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  console.log(`${card.id}`, card);
  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };
  const handleNextCard = async (isCorrect: boolean) => {
    const data = {
      isCorrect,
      totalBoxes: 6,
      cardId: card.id,
      box_id: card.box_id,
    };
    try {
      await updateCardsService(data);
      mutate(`/cards/review?box_id=${boxId}`);
      toast.success("کارت با موفقیت ثبت شد");
    } catch {
      toast.error("ارتباط با سرور قطع شد");
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-full h-48 bg-slate-300 rounded shadow-lg p-4 m-4 flex items-center justify-center text-center transform transition-transform duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ perspective: "1000px" }}
        onClick={handleFlip}
      >
        {!isFlipped ? (
          <div className="flex flex-col">
            <p className="font-medium">سوال: </p>
            <p className="font-medium ltr">{card.question}</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <p className="font-medium">پاسخ: </p>
            <p className="font-medium">{card.answer}</p>
          </div>
        )}
      </div>

      {isFlipped && (
        <div className="flex gap-8">
          <Button variant="default" onClick={() => handleNextCard(true)}>
            درست
          </Button>
          <Button variant="destructive" onClick={() => handleNextCard(false)}>
            غلط
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardComponent;
