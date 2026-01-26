// src/app/[locale]/sentry-example-page/page.tsx
import { notFound } from "next/navigation";

type SearchParams = {
  throw?: string;
};

export default function SentryExamplePage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  // Désactivé par défaut.
  // Pour activer temporairement: ENABLE_SENTRY_EXAMPLE=1 dans l’environnement.
  const enabled = process.env.ENABLE_SENTRY_EXAMPLE === "1";
  if (!enabled) notFound();

  // Test d’erreur côté serveur
  if (searchParams?.throw === "server") {
    throw new Error("Sentry example (server): intentional throw");
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Sentry Example Page
      </h1>

      <p className="mt-3 leading-7 opacity-90">
        This page is disabled by default. Enable it with{" "}
        <code className="px-1 py-0.5 rounded bg-black/5">
          ENABLE_SENTRY_EXAMPLE=1
        </code>
        .
      </p>

      <div className="mt-8 space-y-3">
        <p className="opacity-90">
          Server error test: open{" "}
          <code className="px-1 py-0.5 rounded bg-black/5">?throw=server</code>{" "}
          to intentionally throw on the server.
        </p>

        <a
          href="?throw=server"
          className="inline-block underline underline-offset-4"
        >
          Trigger server error
        </a>
      </div>
    </main>
  );
}
