"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  'a, button, [role="button"], [role="option"], label, summary, [data-cursor]';
const NATIVE = 'input, textarea, select, [contenteditable="true"]';

/**
 * Lime dot that sits exactly on the pointer, with a ring trailing behind it.
 * The ring grows over anything clickable and turns into a labelled disc over
 * elements carrying data-cursor="Label". Mouse only: touch screens, coarse
 * pointers and reduced-motion users keep the native cursor.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;
    if (
      !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)")
        .matches
    ) {
      return;
    }

    const root = document.documentElement;
    let x = -100;
    let y = -100;
    let ringX = -100;
    let ringY = -100;
    let frame = 0;
    let visible = false;

    // Written straight to the DOM: this runs on every pointer move.
    const tick = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      const settled = Math.abs(x - ringX) + Math.abs(y - ringY) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const setVisible = (next: boolean) => {
      if (visible === next) return;
      visible = next;
      dot.style.opacity = ring.style.opacity = next ? "1" : "0";
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        // Hide the native cursor only once ours has somewhere to be. (Not
        // `data-cursor`: that attribute is the label hook matched below.)
        root.dataset.cursorMode = "custom";
        ringX = x;
        ringY = y;
        setVisible(true);
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onOver = (event: PointerEvent) => {
      const el = event.target instanceof Element ? event.target : null;
      const native = el?.closest(NATIVE);
      const target = native ? null : el?.closest<HTMLElement>(INTERACTIVE);
      const text = target?.dataset.cursor ?? "";
      const state = native ? "native" : text ? "label" : target ? "hover" : "default";
      dot.dataset.state = state;
      ring.dataset.state = state;
      if (text) label.textContent = text;
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        setVisible(false);
        return;
      }
      ring.dataset.pressed = "";
    };
    const onUp = () => {
      delete ring.dataset.pressed;
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      cancelAnimationFrame(frame);
      delete root.dataset.cursorMode;
    };
  }, []);

  return (
    <div aria-hidden className="cursor">
      <div ref={ringRef} className="cursor-ring" data-state="default">
        <span>
          <em ref={labelRef} />
        </span>
      </div>
      <div ref={dotRef} className="cursor-dot" data-state="default">
        <span />
      </div>
    </div>
  );
}
