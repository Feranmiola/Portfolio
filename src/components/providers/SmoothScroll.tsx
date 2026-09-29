"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        // Lenis rebuilds itself when options change, so this follows the OS setting.
        smoothWheel: !reduceMotion,
        // Smooth-scroll in-page anchor links. Sections carry scroll-margin-top
        // for the fixed header, which Lenis honours.
        anchors: { immediate: !!reduceMotion },
      }}
    >
      {/* Honours "prefers-reduced-motion" for every motion component at once. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
