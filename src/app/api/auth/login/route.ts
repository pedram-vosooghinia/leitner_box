import { compare } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";
import { query } from "@/db";
export async function POST(req: NextRequest) {
  try {
    const { mobile, password } = await req.json();
    if (!mobile || !password)
      return NextResponse.json(
        {
          success: false,
          message: "لطفا مقادیر فرم را پر نمایید",
        },
        {
          status: 400,
        }
      );

    const userResult = await query("SELECT * FROM users WHERE mobile = $1", [
      mobile,
    ]);
    const user = userResult.rows[0];
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        { status: 404 }
      );
    }



    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "پسورد صحیح نمی باشد",
        },
        {
          status: 404,
        }
      );
    }

    const tokenData = { id: user.id };
    const secret = process.env.SESSION_SECRET || "";
    const token = sign({ tokenData }, secret, { expiresIn: "1d" });

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    });

    return NextResponse.json(
      {
        success: true,
        message: "شما با موفقیت وارد شدید",
        user,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "خطای شبکه لطفا دوباره تلاش نمایید",
      },
      { status: 500 }
    );
  }
}
