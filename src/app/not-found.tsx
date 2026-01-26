import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Page introuvable</h1>
      <p>Le lien est peut-être incorrect.</p>

      <Link href="/">Retour à l’accueil</Link>
    </main>
  );
}
