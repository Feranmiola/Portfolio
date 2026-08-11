"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {/* Honours "prefers-reduced-motion" for every motion component at once,
          without any component having to branch on it during render. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
