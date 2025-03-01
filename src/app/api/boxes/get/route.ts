export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/db";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  console.log("userId", userId);
  try {
    const sqlQuery = `
      SELECT 
        b.id, 
        b.box_number, 
        b.total_parts, 
        COUNT(CASE WHEN c.user_id = $1 THEN c.id END) AS card_count
      FROM 
        boxes AS b
      LEFT JOIN 
        cards AS c 
      ON 
        b.id = c.box_id
      GROUP BY 
        b.id, b.box_number, b.total_parts
      ORDER BY 
        b.box_number ASC; 
    `;

    const result = await query(sqlQuery, [userId]);
    if (!result?.rows?.length) {
      return NextResponse.json(
        {
          success: false,
          message: "هیچ جعبه‌ای یافت نشد",
          data: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result.rows,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "خطایی رخ داده است لطفا دوباره تلاش نمایید",
      },
      { status: 500 }
    );
  }
}
