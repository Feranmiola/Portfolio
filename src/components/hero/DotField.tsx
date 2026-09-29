"use client";

import { useEffect, useRef } from "react";

const GAP = 26;
const RADIUS = 170;
const LIME = "#c8f53c";
const DIM = "#5c6453";

/**
 * A field of dots that breathes slowly and lights up lime around the cursor.
 * Drawn on a 2D canvas; the loop only runs while the canvas is on screen and
 * the tab is visible, and draws a single still frame for reduced motion.
 */
export function DotField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const origin = performance.now();

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let frame = 0;
    let running = false;
    let inView = false;

    // Pointer in client coordinates; converted to canvas space once per frame.
    const pointer = { x: 0, y: 0, active: false };
    const eased = { x: -9999, y: -9999, strength: 0 };

    const draw = (now: number) => {
      const t = (now - origin) / 1000;
      const rect = canvas.getBoundingClientRect();
      const targetX = pointer.x - rect.left;
      const targetY = pointer.y - rect.top;

      if (eased.x < -9000) {
        eased.x = targetX;
        eased.y = targetY;
      }
      eased.x += (targetX - eased.x) * 0.14;
      eased.y += (targetY - eased.y) * 0.14;
      eased.strength += ((pointer.active ? 1 : 0) - eased.strength) * 0.08;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = i * GAP + GAP / 2;
          const baseY = j * GAP + GAP / 2;
          const dx = baseX - eased.x;
          const dy = baseY - eased.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          let influence = Math.max(0, 1 - dist / RADIUS) * eased.strength;
          influence *= influence;

          const push = influence * 12;
          const x = baseX + (dx / dist) * push;
          const y = baseY + (dy / dist) * push;

          if (influence > 0.015) {
            const size = 1.4 + influence * 2.2;
            ctx.fillStyle = LIME;
            ctx.globalAlpha = 0.2 + influence * 0.8;
            ctx.fillRect(x - size / 2, y - size / 2, size, size);
          } else {
            const wave = reduceMotion
              ? 0.5
              : (Math.sin(t * 0.9 - i * 0.28 + j * 0.18) + 1) / 2;
            ctx.fillStyle = DIM;
            ctx.globalAlpha = 0.18 + wave * 0.32;
            ctx.fillRect(x - 0.7, y - 0.7, 1.4, 1.4);
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };

    const play = () => {
      if (running || reduceMotion || !inView || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const pause = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / GAP);
      rows = Math.ceil(height / GAP);
      if (!running) draw(performance.now());
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => (document.hidden ? pause() : play());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) play();
      else pause();
    });
    viewObserver.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      pause();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
