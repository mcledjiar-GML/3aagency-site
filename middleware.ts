import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // "/" est géré par src/app/page.tsx
  if (pathname === "/") {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Exclut les fichiers statiques (.svg, .png, .ico, etc.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
