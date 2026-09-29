"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Types, holds, deletes and cycles through `words`. Starts fully typed so the
 * first render (and reduced-motion visitors) get a complete sentence.
 */
export function Typewriter({ words }: { words: string[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const word = words[index];
    let delay: number;
    let next: () => void;

    if (!deleting && text === word) {
      delay = 2200;
      next = () => setDeleting(true);
    } else if (deleting && text === "") {
      delay = 250;
      next = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      };
    } else {
      delay = deleting ? 26 : 55 + Math.random() * 45;
      next = () =>
        setText(deleting ? text.slice(0, -1) : word.slice(0, text.length + 1));
    }

    const id = window.setTimeout(next, delay);
    return () => window.clearTimeout(id);
  }, [text, deleting, index, words, reduceMotion]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="text-lime">
        {text}
        <span className="ml-1 inline-block h-[0.9em] w-[0.5em] translate-y-[0.12em] animate-blink bg-lime" />
      </span>
    </>
  );
}
