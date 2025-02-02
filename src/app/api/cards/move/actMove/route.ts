import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";

interface RequestBody {
  box_id: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: { data: RequestBody } = await req.json();
    const { box_id } = body.data;

    if (!box_id) {
      return NextResponse.json(
        { success: false, message: "Box ID is required." },
        { status: 400 }
      );
    }

    const updateQuery = `
      UPDATE cards 
        SET 
          part_number = part_number + 1,
          move_date = CURRENT_DATE 
        WHERE 
          box_id = $1 
          AND part_number < (
              SELECT total_parts 
              FROM boxes 
              WHERE id = $1
          )
          AND (review_date != CURRENT_DATE)
          AND (move_date != CURRENT_DATE)
    `;

    await query(updateQuery, [box_id]);

    return NextResponse.json(
      { success: true, message: "Cards updated successfully." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "کارت آپدیت نشد" },
      { status: 500 }
    );
  }
}
