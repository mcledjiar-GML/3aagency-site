import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{padding: '48px'}}>
      <h1>404</h1>
      <p>This page could not be found.</p>
      <Link href="/">Go home</Link>
    </main>
  );
}
