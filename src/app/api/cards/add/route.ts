import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";

interface RequestBody {
  question: string;
  answer: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: { data: RequestBody } = await req.json();
    const { question, answer } = body.data;
    if (!question || !answer) {
      return NextResponse.json(
        {
          success: false,
          message: "تمامی فیلدها الزامی هستند",
        },
        { status: 400 }
      );
    }

    const box_id = 1;
    const part_number = 1;
    const user_id = 1;
    const review_date = new Date();
    const move_date = new Date();
    const sqlQuery = `
      INSERT INTO cards (
        question, answer, box_id, part_number , user_id, review_date ,move_date
      )
      VALUES (
        $1, $2, $3, $4, $5 , $6 , $7
      )
    `;
    const values = [
      question,
      answer,
      box_id,
      part_number,
      user_id,
      review_date,
      move_date
    ];
    await query(sqlQuery, values);

    return NextResponse.json(
      {
        success: true,
        message: "کارت با موفقیت اضافه شد",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "خطایی رخ داده است، لطفا دوباره تلاش نمایید",
      },
      { status: 500 }
    );
  }
}
