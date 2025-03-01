import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const tokenValue = request.cookies.get("token");

  if (tokenValue && ["/login", "/signin"].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!tokenValue && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signin", "/dashboard/:path*"],
};
