export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { query } from "@/db";

export async function GET() {
  try {
    const sqlQuery = `SELECT * FROM cards;`;

    const result = await query(sqlQuery, []);
    if (!result?.rows?.length) {
      return NextResponse.json(
        {
          success: false,
          message: "هیچ هشتگی یافت نشد",
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
