"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { fieldClass } from "./field";
import { Check, ChevronDown } from "./Icons";

/**
 * A select styled like the rest of the form. Follows the ARIA "select-only
 * combobox" pattern: focus stays on the trigger, arrows move the highlight,
 * Enter picks, Escape closes. The chosen value is submitted through a hidden
 * input, so the surrounding <form> reads it like any other field.
 */
export function Select({
  id,
  name,
  options,
  placeholder = "Pick one",
  defaultValue = "",
  invalid,
  describedBy,
}: {
  id: string;
  name: string;
  options: readonly string[];
  placeholder?: string;
  defaultValue?: string;
  invalid?: boolean;
  describedBy?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  // Close when pressing anywhere else.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const show = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const choose = (option: string) => {
    setValue(option);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (open) setActive((i) => Math.min(last, i + 1));
        else show();
        break;
      case "ArrowUp":
        event.preventDefault();
        if (open) setActive((i) => Math.max(0, i - 1));
        else show();
        break;
      case "Home":
      case "End":
        if (open) {
          event.preventDefault();
          setActive(event.key === "Home" ? 0 : last);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (!open) show();
        else if (active >= 0) choose(options[active]);
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          // Only the list closes; the dialog around it stays open.
          event.stopPropagation();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        className={cn(
          fieldClass,
          "flex items-center justify-between gap-3 text-left",
          !value && "text-ink-600",
          open && "border-lime"
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          size={16}
          className={cn(
            "shrink-0 text-ink-400 transition-transform duration-200",
            open && "rotate-180 text-lime"
          )}
        />
      </button>
      <input type="hidden" name={name} value={value} />

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            className="absolute inset-x-0 top-[calc(100%+6px)] z-20 rounded-[6px] border border-ink-700 bg-ink-950 p-1 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {options.map((option, i) => (
              <li
                key={option}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={option === value}
                onPointerMove={() => setActive(i)}
                onClick={() => choose(option)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-[4px] px-3 py-2.5 text-sm transition-colors",
                  i === active ? "bg-lime text-lime-ink" : "text-paper"
                )}
              >
                {option}
                {option === value && <Check size={14} className="shrink-0" />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
