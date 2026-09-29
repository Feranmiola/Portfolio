"use client";

import { cn } from "@/lib/cn";

/**
 * A card with a soft lime glow that follows the pointer. The position is
 * written to CSS variables, so hovering never re-renders anything.
 */
export function Spotlight({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      onPointerMove={(event) => {
        const el = event.currentTarget;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--x", `${event.clientX - rect.left}px`);
        el.style.setProperty("--y", `${event.clientY - rect.top}px`);
      }}
      className={cn("group/spot relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgb(200 245 60 / 0.10), transparent 45%)",
        }}
      />
      {children}
    </div>
  );
}
