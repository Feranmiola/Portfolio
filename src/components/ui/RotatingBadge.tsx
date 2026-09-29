"use client";

import { useContactForm } from "@/components/contact/ContactFormProvider";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "./Icons";

/** Circular "available for work" badge with its text running around the edge. */
export function RotatingBadge({ className }: { className?: string }) {
  const { open } = useContactForm();

  return (
    <button
      type="button"
      onClick={open}
      data-cursor="Hire"
      aria-label="Available for work: start a project"
      className={cn(
        "group relative grid size-32 place-items-center md:size-36",
        className
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 120 120"
        className="absolute inset-0 size-full animate-[spin_14s_linear_infinite] text-paper"
      >
        <defs>
          <path
            id="badge-circle"
            d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"
          />
        </defs>
        <text className="fill-current font-mono text-[10.5px] uppercase tracking-[0.32em]">
          <textPath href="#badge-circle">
            Available for work ✳ Let&apos;s build ✳
          </textPath>
        </text>
      </svg>
      <span className="relative grid size-12 place-items-center rounded-full bg-lime text-lime-ink transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110">
        <ArrowUpRight size={20} />
      </span>
    </button>
  );
}
