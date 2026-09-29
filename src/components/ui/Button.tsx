import { cn } from "@/lib/cn";

type Size = "sm" | "lg";
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/*
 * Neo-brutalist lime button: the face sits on an outlined "shadow" plate and
 * presses down into it on hover.
 */

const shell = "group relative inline-flex select-none";

const face = (size: Size) =>
  cn(
    "relative inline-flex items-center gap-2 rounded-[4px] border border-lime bg-lime font-mono font-medium uppercase tracking-wider text-lime-ink transition-transform duration-200 ease-out group-hover:translate-x-[5px] group-hover:translate-y-[5px] group-active:translate-x-[5px] group-active:translate-y-[5px]",
    size === "lg" ? "px-6 py-4 text-sm" : "px-3.5 py-2 text-xs"
  );

const Plate = () => (
  <span
    aria-hidden
    className="absolute inset-0 translate-x-[5px] translate-y-[5px] rounded-[4px] border border-lime"
  />
);

export function BrutalButton({
  className,
  children,
  size = "lg",
  ...props
}: AnchorProps & { size?: Size }) {
  return (
    <a className={cn(shell, className)} {...props}>
      <Plate />
      <span className={face(size)}>{children}</span>
    </a>
  );
}

export function BrutalActionButton({
  className,
  children,
  size = "lg",
  ...props
}: ButtonProps & { size?: Size }) {
  return (
    <button
      className={cn(shell, "disabled:cursor-not-allowed", className)}
      {...props}
    >
      <Plate />
      <span className={cn(face(size), "group-disabled:translate-x-[5px] group-disabled:translate-y-[5px] group-disabled:opacity-70")}>
        {children}
      </span>
    </button>
  );
}

export function GhostButton({ className, children, ...props }: AnchorProps) {
  return (
    <a
      className={cn(
        "group inline-flex items-center gap-2 rounded-[4px] border border-ink-600 px-6 py-4 font-mono text-sm uppercase tracking-wider text-paper transition-colors duration-200 hover:border-lime hover:text-lime",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
