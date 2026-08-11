"use client";

import React from "react";
import { motion } from "framer-motion";
import type { TargetAndTransition, Transition } from "framer-motion";

/**
 * Motion signatures shared by every icon on the site.
 * Each icon picks the one that suits its shape (spin for round logos,
 * wiggle for the WhatsApp bubble, send for the envelope, ...).
 */
export type IconMotion =
  | "pop"
  | "wiggle"
  | "spin"
  | "float"
  | "send"
  | "fly"
  | "slide"
  | "slideLeft"
  | "flip";

const spring: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 18,
  mass: 0.6,
};

const hoverStates: Record<IconMotion, TargetAndTransition> = {
  pop: { scale: 1.18, transition: spring },
  wiggle: {
    scale: 1.1,
    rotate: [0, -12, 10, -6, 0],
    transition: { duration: 0.55, ease: "easeInOut" },
  },
  spin: {
    scale: 1.08,
    rotate: 360,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
  float: { scale: 1.12, y: -4, transition: spring },
  send: { scale: 1.08, x: 3, y: -4, rotate: -8, transition: spring },
  fly: {
    x: [0, 5, 0],
    y: [0, -6, 0],
    rotate: [0, -10, 0],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  slide: { x: 4, transition: spring },
  slideLeft: { x: -4, transition: spring },
  flip: { rotateY: 180, transition: { duration: 0.6, ease: "easeInOut" } },
};

const restState: TargetAndTransition = {
  scale: 1,
  rotate: 0,
  rotateY: 0,
  x: 0,
  y: 0,
  transition: spring,
};

interface AnimatedIconProps {
  children: React.ReactNode;
  /** Which motion signature to play on hover. */
  hover?: IconMotion;
  /**
   * "self"   — the icon reacts to being hovered directly.
   * "parent" — the icon reacts when an ancestor motion element enters its
   *            "hover" variant, so the whole button/card drives the icon.
   */
  trigger?: "self" | "parent";
  /** Pop the icon in the first time it scrolls into view. */
  entry?: boolean;
  delay?: number;
  className?: string;
}

const AnimatedIcon = ({
  children,
  hover = "pop",
  trigger = "self",
  entry = true,
  delay = 0,
  className = "",
}: AnimatedIconProps) => {
  // Reduced motion is handled globally by <MotionConfig reducedMotion="user">,
  // not by branching props here — that would desync SSR from hydration.
  return (
    <motion.span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ transformPerspective: 600 }}
      variants={{ rest: restState, hover: hoverStates[hover] }}
      /**
       * Only the "self" variant may name a variant label here: framer-motion
       * treats a component that sets `initial`/`whileHover` to a label as
       * self-controlling, which cuts it off from the parent's variant state.
       * For trigger="parent" we stay silent and inherit rest/hover instead.
       */
      initial={trigger === "self" ? "rest" : undefined}
      whileHover={trigger === "self" ? "hover" : undefined}
    >
      <motion.span
        className="inline-flex items-center justify-center"
        initial={entry ? { opacity: 0, scale: 0.7 } : undefined}
        whileInView={entry ? { opacity: 1, scale: 1 } : undefined}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ ...spring, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
};

export default AnimatedIcon;
