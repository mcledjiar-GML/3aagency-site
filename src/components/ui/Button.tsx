import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

function cls(variant: Variant) {
  return variant === "primary" ? "btn btn-primary" : "btn btn-secondary";
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  target,
  rel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  target?: string;
  rel?: string;
}) {
  return (
    <a href={href} className={cls(variant)} target={target} rel={rel}>
      {children}
    </a>
  );
}
