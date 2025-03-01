export const dynamic = "force-dynamic";

import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const box_id = searchParams.get("box_id");
    const user_id = searchParams.get("userId");
    if (!box_id) {
      return NextResponse.json(
        { success: false, message: "Box ID is required." },
        { status: 400 }
      );
    }

    const cardsQuery = `
        SELECT 
            id
        FROM 
            cards 
        WHERE 
            box_id = $1 
            AND user_id = $2
            AND part_number < (
                SELECT total_parts 
                FROM boxes 
                WHERE id = $1
            )
            AND (review_date != CURRENT_DATE) 
            AND (move_date != CURRENT_DATE) 
        `;

    const cards = await query(cardsQuery, [box_id, user_id]);
    const count = cards.rows.length;
    return NextResponse.json(
      {
        success: count > 0,
        message: count > 0,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "An error occurred." },
      { status: 500 }
    );
  }
}
