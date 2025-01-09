"use client";
import { useEffect, useState } from "react";
import AddCardForm from "@/components/AddCardForm";
import CardBox from "@/components/CardBox";

const HomePage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cards from backend
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("/api/cards");
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">جعبه لایتنر</h1>
      <div className="mb-8">
        <AddCardForm setCards={setCards} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map((boxNumber) => (
          <div
            key={boxNumber}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <CardBox boxNumber={boxNumber} cards={cards} loading={loading} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
