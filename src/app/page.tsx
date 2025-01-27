"use client";
import React from "react";
import BoxList from "@/components/BoxList";
import AddCardForm from "@/components/AddCardForm";
import ReviewCards from "@/components/ReviewCards";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AddCardForm />
      <BoxList  />
      <ReviewCards  />
    </div>
  );
};

export default HomePage;
