"use client";

import { motion, type HTMLMotionProps } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  delay = 0,
  y = 28,
  children,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Masks each character and slides it up. Screen readers get the plain
 * string through aria-label; the split glyphs are hidden from them.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const MotionTag = motion[Tag];
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <MotionTag
      aria-label={text}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {words.map((word, w) => (
        <span
          key={w}
          aria-hidden
          className="inline-flex overflow-hidden pb-[0.08em] align-bottom"
        >
          {Array.from(word).map((char) => {
            const i = charIndex++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { y: "110%" },
                  visible: {
                    y: "0%",
                    transition: { duration: 0.7, ease, delay: delay + i * stagger },
                  },
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </MotionTag>
  );
}
