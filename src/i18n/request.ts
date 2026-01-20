import {getRequestConfig} from "next-intl/server";
import {routing, isLocale, type Locale} from "./routing";

async function loadMessages(locale: Locale) {
  switch (locale) {
    case "de":
      return (await import("../messages/de.json")).default;
    case "fr":
      return (await import("../messages/fr.json")).default;
    case "en":
    default:
      return (await import("../messages/en.json")).default;
  }
}

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;

  const locale: Locale =
    requested && isLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale)
  };
});
