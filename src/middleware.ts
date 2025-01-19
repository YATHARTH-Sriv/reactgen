import { NextRequest, NextResponse } from "next/server";

export const config = { matcher: ["/newdash", "/Login"] };

export async function middleware(request: NextRequest) {
  const token =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token");

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Redirect authenticated users from login/signup/verify to dashboard
  if (
    token &&
    (pathname.startsWith("/Login") ||
      pathname.startsWith("/sign-up") ||
      pathname === "/")
  ) {
    url.pathname = "/newdash";
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!token && pathname.startsWith("/newdash")) {
    url.pathname = "/Login";
    return NextResponse.redirect(url);
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}
