"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log minimal (pas de headers/cookies/PII)
    console.error("[app error]", { message: error.message, digest: error.digest });
  }, [error]);

  return (
    <main style={{ padding: 24 }}>
      <h1>Une erreur est survenue</h1>
      <p>Réessaie. Si le problème persiste, contacte-nous.</p>

      <button onClick={() => reset()} style={{ marginTop: 12 }}>
        Réessayer
      </button>
    </main>
  );
}
