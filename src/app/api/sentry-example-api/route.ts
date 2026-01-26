// src/app/api/sentry-example-api/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Désactivé par défaut.
  // Pour activer temporairement: ENABLE_SENTRY_EXAMPLE=1 dans l’environnement.
  const enabled = process.env.ENABLE_SENTRY_EXAMPLE === "1";
  if (!enabled) {
    return NextResponse.json(
      { ok: false, disabled: true },
      { status: 404, headers: { "Cache-Control": "no-store" } }
    );
  }

  // Test d’erreur côté serveur
  throw new Error("Sentry example (API): intentional throw");
}
