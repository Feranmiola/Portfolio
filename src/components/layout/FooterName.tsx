"use client";

import { useEffect, useRef } from "react";

/**
 * The wordmark as a dark LED board: the dots under the pointer light up lime
 * and fade back out when it leaves. It is sized by measurement so the name
 * always spans the container exactly, at any width and whatever the font's
 * metrics turn out to be.
 */
export function FooterName({ name }: { name: string }) {
  const lineRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const text = textRef.current;
    if (!line || !text) return;

    let lastWidth = 0;
    const fit = () => {
      const available = line.clientWidth;
      const width = text.getBoundingClientRect().width;
      if (!available || !width) return;
      // Text width scales linearly with font size, so one pass is exact.
      const size = parseFloat(getComputedStyle(line).fontSize);
      line.style.fontSize = `${(size * available) / width}px`;
      lastWidth = available;
    };

    fit();
    document.fonts.ready.then(fit);

    // Refitting changes the height, so only react to width changes.
    const observer = new ResizeObserver(() => {
      if (line.clientWidth !== lastWidth) fit();
    });
    observer.observe(line);
    return () => observer.disconnect();
  }, [name]);

  return (
    <p
      ref={lineRef}
      aria-hidden
      // The calc() is a close first guess for before the measurement runs.
      className="footer-name font-dot-round select-none whitespace-nowrap pb-[0.08em] text-[length:calc((100vw-2.5rem)/6.7)] font-black uppercase leading-[0.8] md:text-[length:calc((min(100vw,1440px)-4rem)/6.7)]"
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
      <span ref={textRef}>{name}</span>
    </p>
  );
}
