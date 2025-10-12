import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/admin"]; // login page
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("admin_token")?.value;

  const isPublicPath = PUBLIC_PATHS.some(path => url.pathname.startsWith(path));

  // No token and trying to access protected path
  if (!token && !isPublicPath) {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  // Validate token if exists
  let isTokenValid = false;
  if (token) {
    try {
      const data:any = await jwtVerify(token, SECRET_KEY);
      if (data.email) {
        isTokenValid = true;
      } else {
        isTokenValid = false;
      }

    } catch (err) {
      isTokenValid = false;
    }
  }

  // Redirect logged-in user from login page
  if (isPublicPath && isTokenValid) {
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  // Redirect invalid token users away from /admin/** pages
  if (!isPublicPath && !isTokenValid) {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
