import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";

interface RequestBody {
  cardId: number;
  isCorrect: boolean;
  box_id: number;
  totalBoxes: number;
}
export async function POST(req: NextRequest) {
  try {
    const body: { data: RequestBody } = await req.json();
    const { cardId, isCorrect, box_id, totalBoxes } = body.data;

    const newBoxId = isCorrect ? Math.min(box_id + 1, totalBoxes) : 1;
    const sqlQuery = `
    UPDATE cards 
    SET box_id = $1, 
    review_date = CURRENT_DATE ,
    part_number= 1
    WHERE id = $2
`;
    const values = [newBoxId, cardId];
    await query(sqlQuery, values);

    return NextResponse.json({ success: true, newBoxId }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "کارت آپدیت نشد" },
      { status: 500 }
    );
  }
}
