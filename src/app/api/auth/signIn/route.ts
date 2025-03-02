import { NextResponse, NextRequest } from "next/server";
import { hash } from "bcryptjs";
import { query } from "@/db";
import { SignInFormInputs } from "@/types/signin";
export async function POST(req: NextRequest) {
  try {
    const values: SignInFormInputs = await req.json();
    const first_name = values.firstName;
    const last_name = values.lastName;
    const mobile = values.mobile;
    const password = values.password;
    const role = "guest";
    if (!first_name || !last_name || !mobile || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "مقادیر نامعتبر است لطفا دوباره تلاش نمایید",
        },
        { status: 400 }
      );
    }

    const userResult = await query("SELECT * FROM users WHERE mobile = $1", [
      mobile,
    ]);
    const existingUser = userResult.rows[0];
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "شما قبلا ثبت نام کرده اید",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);
    const newUserResult = await query(
      "INSERT INTO users (first_name, last_name, mobile, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [first_name, last_name, mobile, hashedPassword, role]
    );
    if (!newUserResult.rows.length) {
      return NextResponse.json(
        { success: false, message: "خطا در ثبت‌ نام، لطفا دوباره تلاش کنید" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "ثبت‌ نام موفقیت‌آمیز بود",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "اشتباهی رخ داده است، لطفا دوباره تلاش نمایید",
      },
      { status: 500 }
    );
  }
}
