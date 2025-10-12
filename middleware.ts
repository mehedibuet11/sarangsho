import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const LOGIN_PATH = "/admin"; // login page
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("admin_token")?.value;

  const isLoginPage = url.pathname === LOGIN_PATH;

  let isTokenValid = false;

  if (token) {
    try {
      const data: any = await jwtVerify(token, SECRET_KEY);
      if (data?.email) {
        isTokenValid = true;
      }
    } catch (err) {
      isTokenValid = false;
    }
  }

  // 1️⃣ If user is on login page but already logged in, redirect to dashboard
  if (isLoginPage && isTokenValid) {
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  // 2️⃣ If user is trying to access /admin/** (except login) without valid token
  if (!isLoginPage && url.pathname.startsWith("/admin") && !isTokenValid) {
    url.pathname = LOGIN_PATH;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // matches all /admin/** routes
};
