"use client";
import React from "react";
import BoxList from "@/components/BoxList";
import AddCardForm from "@/components/AddCardForm";
import ReviewCards from "@/components/ReviewCards";
import MoveCards from "@/components/MoveCards";
const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AddCardForm />
      <BoxList />
      <MoveCards />
      <ReviewCards />
    </div>
  );
};

export default DashboardPage;
