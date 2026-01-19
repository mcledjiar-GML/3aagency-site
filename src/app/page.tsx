import {headers} from "next/headers";
import {redirect} from "next/navigation";

function getLocaleFromCountry(country: string | null): string | null {
  if (!country) return null;

  switch (country.toUpperCase()) {
    case "DE":
    case "AT":
    case "CH":
      return "de";

    case "FR":
    case "BE":
      return "fr";

    default:
      return null;
  }
}

function getLocaleFromAcceptLanguage(acceptLanguage: string | null): string | null {
  if (!acceptLanguage) return null;

  const first = acceptLanguage.split(",")[0]?.trim().toLowerCase();
  if (!first) return null;

  const base = first.split("-")[0];

  if (base === "de") return "de";
  if (base === "fr") return "fr";
  if (base === "en") return "en";

  return null;
}

export default async function Home() {
  const h = await headers();

  // Sur Vercel, ce header est souvent disponible
  const fromVercelCountry = getLocaleFromCountry(h.get("x-vercel-ip-country"));
  if (fromVercelCountry) {
    redirect(`/${fromVercelCountry}`);
  }

  // Fallback navigateur (local)
  const fromAcceptLanguage = getLocaleFromAcceptLanguage(h.get("accept-language"));
  if (fromAcceptLanguage) {
    redirect(`/${fromAcceptLanguage}`);
  }

  // Fallback final
  redirect("/en");
}
