export const dynamic = "force-dynamic";

import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";
export async function GET(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const box_id = searchParams.get("box_id");
  console.log("box_id",box_id)
      if (!box_id) {
        return NextResponse.json(
          { success: false, message: "Box ID is required." },
          { status: 400 }
        );
      }
  
  
      const cardsQuery = `
      SELECT 
        id, 
        question, 
        answer,
        box_id,
        part_number,
        user_id
        review_date
      FROM 
        cards 
      WHERE 
        box_id = $1 
        AND part_number = (
          SELECT total_parts 
          FROM boxes 
          WHERE id = $1
        )
        AND (review_date != CURRENT_DATE) -- شرط برای عدم نمایش کارت‌های امروز
    `;
      const cards = await query(cardsQuery, [box_id]);
  
      return NextResponse.json(
        { success: true, message: "Cards retrieved successfully.", data: cards.rows },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching cards:", error);
      return NextResponse.json(
        { success: false, message: "An error occurred." },
        { status: 500 }
      );
    }
  }
  