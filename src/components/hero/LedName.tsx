"use client";

import { motion } from "motion/react";

/** The name as a dot-matrix sign powering on, one LED letter at a time. */
export function LedName({ first, last }: { first: string; last: string }) {
  const letters = `${first} ${last}`;

  return (
    <h1
      aria-label={`${first} ${last}`}
      className="font-dot-round text-[clamp(3.6rem,19vw,7rem)] font-black uppercase leading-[0.85] tracking-[-0.02em] text-lime [text-shadow:0_0_28px_rgba(200,245,60,0.35)] sm:text-[clamp(4rem,12.2vw,11.5rem)]"
    >
      {Array.from(letters).map((char, i) =>
        char === " " ? (
          <span key={i} aria-hidden className="block sm:inline">
            <span className="hidden sm:inline">&nbsp;</span>
          </span>
        ) : (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.25, 1] }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.07, times: [0, 0.3, 0.55, 1] }}
          >
            {char}
          </motion.span>
        )
      )}
    </h1>
  );
}
