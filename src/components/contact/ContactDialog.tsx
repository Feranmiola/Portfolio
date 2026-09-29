"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sendInquiry, type InquiryState } from "@/app/actions/contact";
import { inquiry, site } from "@/lib/content";
import { BrutalActionButton } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { fieldClass } from "@/components/ui/field";
import { ArrowUpRight, Check, Close } from "@/components/ui/Icons";

const idle: InquiryState = { status: "idle" };

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 font-mono text-xs text-alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Wires a control to its label and, when present, its error message. */
function describe(id: string, error?: string) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
}

export function ContactDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [state, setState] = useState<InquiryState>(idle);
  const [pending, startTransition] = useTransition();
  const firstField = useRef<HTMLInputElement>(null);
  const id = useId();
  const errors = state.status === "invalid" ? (state.errors ?? {}) : {};

  // Fresh form each time it opens, with the caret ready in the first field.
  useEffect(() => {
    if (!open) return;
    setState(idle);
    const frame = requestAnimationFrame(() => firstField.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      setState(await sendInquiry(data));
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="inquiry"
          className="fixed inset-0 z-[150]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <div
            data-lenis-prevent
            className="pointer-events-none absolute inset-0 overflow-y-auto overscroll-contain p-4 sm:p-6"
          >
            <div className="flex min-h-full items-center justify-center">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${id}-title`}
                // No overflow clipping, so the custom select's list can hang below its field.
                className="pointer-events-auto relative w-full max-w-xl rounded-[16px] border border-ink-700 border-t-[3px] border-t-lime bg-ink-900 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
                initial={{ y: 24, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 24, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              >

                {state.status === "sent" ? (
                  <div className="p-8 text-center sm:p-12">
                    <span className="mx-auto grid size-16 place-items-center rounded-full bg-lime text-lime-ink">
                      <Check size={28} />
                    </span>
                    <h2
                      id={`${id}-title`}
                      className="mt-6 text-2xl font-semibold tracking-[-0.03em]"
                    >
                      Sent. Thanks!
                    </h2>
                    <p className="mt-2 text-ink-400">
                      I&apos;ll read it and get back to you at the email you left.
                    </p>
                    <BrutalActionButton
                      type="button"
                      size="sm"
                      onClick={onClose}
                      className="mt-8"
                    >
                      Close
                    </BrutalActionButton>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-6 border-b border-ink-800 p-6 sm:p-8">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">
                          New inquiry
                        </p>
                        <h2
                          id={`${id}-title`}
                          className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
                        >
                          Start a project
                        </h2>
                        <p className="mt-2 text-ink-400">
                          Tell me a little about it and I&apos;ll get back to you.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="grid size-10 shrink-0 place-items-center rounded-[4px] border border-ink-700 text-ink-300 transition-colors hover:border-lime hover:text-lime"
                      >
                        <Close size={18} />
                      </button>
                    </div>

                    <form onSubmit={submit} noValidate className="space-y-5 p-6 sm:p-8">
                      {/* Honeypot: hidden from people, tempting to bots. */}
                      <div
                        aria-hidden
                        className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden"
                      >
                        <input name="website" tabIndex={-1} autoComplete="off" />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id={`${id}-name`} label="Name" error={errors.name}>
                          <input
                            ref={firstField}
                            {...describe(`${id}-name`, errors.name)}
                            name="name"
                            type="text"
                            maxLength={80}
                            autoComplete="name"
                            placeholder="Ada Lovelace"
                            className={fieldClass}
                          />
                        </Field>
                        <Field id={`${id}-email`} label="Email" error={errors.email}>
                          <input
                            {...describe(`${id}-email`, errors.email)}
                            name="email"
                            type="email"
                            maxLength={120}
                            autoComplete="email"
                            placeholder="you@company.com"
                            className={fieldClass}
                          />
                        </Field>
                      </div>

                      <Field
                        id={`${id}-type`}
                        label="What are you building?"
                        error={errors.type}
                      >
                        <Select
                          id={`${id}-type`}
                          name="type"
                          options={inquiry.types}
                          placeholder="Pick one"
                          invalid={!!errors.type}
                          describedBy={errors.type ? `${id}-type-error` : undefined}
                        />
                      </Field>

                      <Field id={`${id}-message`} label="The project" error={errors.message}>
                        <textarea
                          {...describe(`${id}-message`, errors.message)}
                          name="message"
                          rows={5}
                          maxLength={2000}
                          placeholder="What it is, who it's for, and when you'd like it live."
                          className={`${fieldClass} resize-y`}
                        />
                      </Field>

                      {state.status === "failed" && (
                        <p
                          role="alert"
                          className="rounded-[6px] border border-ink-700 bg-ink-950 p-4 text-sm leading-relaxed text-ink-300"
                        >
                          Couldn&apos;t send that just now.{" "}
                          <a
                            href={state.mailto}
                            className="text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime"
                          >
                            Open it in your mail app instead
                          </a>
                          ; everything you typed is already in the draft.
                        </p>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <p className="font-mono text-[11px] text-ink-500">
                          Replies come from {site.email}
                        </p>
                        <BrutalActionButton type="submit" disabled={pending}>
                          {pending ? "Sending…" : "Send inquiry"}
                          <ArrowUpRight size={16} />
                        </BrutalActionButton>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
