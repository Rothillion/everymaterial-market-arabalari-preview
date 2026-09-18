import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="text-[10px] font-bold tracking-wide text-accent-deep bg-accent/10 rounded px-1.5 py-0.5">
      {children}
    </span>
  );
}
