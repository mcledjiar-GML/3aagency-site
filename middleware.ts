import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // IMPORTANT : "/" est géré par src/app/page.tsx (ton redirect basé sur headers)
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Pour toutes les routes non-statiques, next-intl fait le job
  return intlMiddleware(request);
}

export const config = {
  // IMPORTANT : on EXCLUT tous les fichiers statiques (.*\\..*)
  // Donc /brand/logo.svg n'est JAMAIS intercepté par le middleware
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
