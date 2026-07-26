import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const isChinese =
    request.nextUrl.pathname === "/zh" ||
    request.nextUrl.pathname.startsWith("/zh/");

  requestHeaders.set("x-mend-locale", isChinese ? "zh-Hans" : "en-AU");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
