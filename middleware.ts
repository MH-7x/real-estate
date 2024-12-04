import { NextRequest, NextResponse } from "next/server";
export const config = {
   matcher: [
      "/dashboard/:path*",
      "/login",
   ],
};

export async function middleware(request: NextRequest) {
   const token = request.cookies.get("token");
   const url = request.nextUrl;
   // Redirect to dashboard if the user is already authenticated
   // and trying to access sign-in, sign-up, or home page
   if (
      token &&
      (url.pathname.startsWith("/login"))){
      return NextResponse.redirect(new URL("/dashboard", request.url));
   }

   if (!token && url.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
   }

   return NextResponse.next();
}
