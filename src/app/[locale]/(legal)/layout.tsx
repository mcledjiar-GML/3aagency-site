import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[720px] px-4 md:px-6 lg:px-8 py-10">
      {children}
    </div>
  );
}
