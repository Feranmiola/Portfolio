"use client";

/**
 * The wordmark as a dark LED board: the dots under the pointer light up lime
 * and fade back out when it leaves. Position is written to CSS variables, so
 * moving the mouse never re-renders anything.
 */
export function FooterName({ name }: { name: string }) {
  return (
    <p
      aria-hidden
      className="footer-name font-dot-round select-none whitespace-nowrap text-center text-[clamp(3.5rem,16.4vw,18rem)] font-black uppercase leading-[0.72]"
      style={{ marginBottom: "-0.12em" }}
      onPointerEnter={(event) => {
        event.currentTarget.dataset.lit = "";
      }}
      onPointerLeave={(event) => {
        delete event.currentTarget.dataset.lit;
      }}
      onPointerMove={(event) => {
        const el = event.currentTarget;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--x", `${event.clientX - rect.left}px`);
        el.style.setProperty("--y", `${event.clientY - rect.top}px`);
      }}
    >
      {name}
    </p>
  );
}
