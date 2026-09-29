import { cn } from "@/lib/cn";
import { Reveal, SplitText } from "./Reveal";

/**
 * Section header: a mono index eyebrow, the dot-matrix title and an optional
 * supporting line.
 */
export function SectionHeading({
  index,
  label,
  title,
  aside,
  className,
}: {
  index: string;
  label: string;
  title: string;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-8 md:grid-cols-12 md:items-end",
        className
      )}
    >
      <div className="md:col-span-8">
        <Reveal className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
          <span className="text-lime">({index})</span>
          <span className="h-px w-10 bg-ink-600" />
          <span>{label}</span>
        </Reveal>
        <SplitText
          as="h2"
          text={title}
          className="font-dot-round block text-[clamp(3rem,10vw,8.5rem)] font-black uppercase leading-[0.86] tracking-tight text-paper"
        />
      </div>
      {aside && (
        <Reveal delay={0.15} className="text-balance text-ink-400 md:col-span-4 md:pb-3">
          {aside}
        </Reveal>
      )}
    </div>
  );
}
