"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  type RefObject,
} from "react";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { sendInquiry, type InquiryState } from "@/app/actions/contact";
import { inquiry, site } from "@/lib/content";
import { BrutalActionButton } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { fieldClass } from "@/components/ui/field";
import { ArrowUpRight, Check, Close } from "@/components/ui/Icons";

/** Below md the dialog is a bottom sheet. Must match the max-md: classes. */
const SHEET_QUERY = "(max-width: 47.99rem)";

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

function useIsSheet() {
  const [sheet, setSheet] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(SHEET_QUERY);
    const update = () => setSheet(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return sheet;
}

/**
 * Keeps the dialog clear of the on-screen keyboard. When the keyboard opens,
 * browsers shrink the *visual* viewport and leave the layout viewport alone,
 * so the gap between the two is how far a bottom-anchored element has to lift.
 * Both numbers go to CSS variables (--kb: the lift, --vvh: the visible height)
 * and the focused field is scrolled to the middle of what is still visible.
 */
function useKeyboardLift(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    const el = ref.current;
    const viewport = window.visualViewport;
    if (!active || !el || !viewport) return;

    let timer = 0;

    const measure = () => {
      const lift = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      el.style.setProperty("--kb", `${Math.round(lift)}px`);
      el.style.setProperty("--vvh", `${Math.round(viewport.height)}px`);
      // Lets the layout tighten up while space is scarce (see group/kb).
      el.toggleAttribute("data-kb", lift > 0);
    };

    const reveal = () => {
      const focused = document.activeElement;
      const scroller = el.querySelector<HTMLElement>("[data-scroll-area]");
      if (!(focused instanceof HTMLElement) || !scroller?.contains(focused)) return;
      const field = focused.getBoundingClientRect();
      const view = scroller.getBoundingClientRect();
      const offset = field.top + field.height / 2 - (view.top + view.height / 2);
      scroller.scrollBy({ top: offset, behavior: "smooth" });
    };

    // Wait for the keyboard (and the sheet's own transition) to settle first.
    const revealSoon = (delay: number) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(reveal, delay);
    };
    const onViewportChange = () => {
      measure();
      revealSoon(250);
    };
    const onFocusIn = () => revealSoon(350);

    measure();
    viewport.addEventListener("resize", onViewportChange);
    viewport.addEventListener("scroll", measure);
    el.addEventListener("focusin", onFocusIn);

    return () => {
      window.clearTimeout(timer);
      viewport.removeEventListener("resize", onViewportChange);
      viewport.removeEventListener("scroll", measure);
      el.removeEventListener("focusin", onFocusIn);
    };
  }, [ref, active]);
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
  const isSheet = useIsSheet();
  const wrapRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();
  const id = useId();
  const errors = state.status === "invalid" ? (state.errors ?? {}) : {};

  useKeyboardLift(wrapRef, open);

  // Fresh form each time it opens. On desktop the caret starts in the first
  // field; on the sheet that would throw the keyboard over half of it, so the
  // sheet itself takes focus instead.
  useEffect(() => {
    if (!open) return;
    setState(idle);
    const frame = requestAnimationFrame(() => {
      const target = window.matchMedia(SHEET_QUERY).matches
        ? dialogRef.current
        : firstField.current;
      target?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      try {
        setState(await sendInquiry(data));
      } catch {
        // Offline, or the server refused the request outright (oversized, say).
        setState({ status: "failed" });
      }
    });
  };

  const startDrag = (event: React.PointerEvent) => {
    if (isSheet) dragControls.start(event);
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

          {/* One structure for both layouts, so resizing or rotating never
              remounts the form and loses what was typed. */}
          <div
            ref={wrapRef}
            data-lenis-prevent
            className="group/kb pointer-events-none absolute inset-0 flex items-end pb-[var(--kb,0px)] transition-[padding] duration-200 ease-out md:block md:overflow-y-auto md:overscroll-contain md:p-6 md:pb-[max(1.5rem,var(--kb,0px))]"
          >
            <div className="flex w-full md:min-h-full md:items-center md:justify-center">
              <motion.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${id}-title`}
                tabIndex={-1}
                className="pointer-events-auto relative flex w-full flex-col border border-t-[3px] border-ink-700 border-t-lime bg-ink-900 outline-none max-md:max-h-[calc(var(--vvh,100svh)-0.75rem)] max-md:rounded-t-[20px] max-md:border-b-0 max-md:shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.9)] md:max-w-xl md:rounded-[16px] md:shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
                initial={isSheet ? { y: "100%" } : { y: 24, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                exit={isSheet ? { y: "100%" } : { y: 24, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 360, damping: 36 }}
                drag={isSheet ? "y" : false}
                dragControls={dragControls}
                dragListener={false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.5 }}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 110 || info.velocity.y > 600) onClose();
                }}
              >
                {/* Grabber: pull the sheet down to dismiss it. */}
                <div
                  onPointerDown={startDrag}
                  className="grid h-6 shrink-0 cursor-grab touch-none place-items-center active:cursor-grabbing md:hidden"
                >
                  <span className="h-1 w-10 rounded-full bg-ink-600" />
                </div>

                {state.status === "sent" ? (
                  <div className="p-8 pb-10 text-center sm:p-12">
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
                    <div
                      onPointerDown={startDrag}
                      className="flex shrink-0 items-start justify-between gap-6 border-b border-ink-800 px-6 pb-5 pt-1 max-md:touch-none sm:px-8 md:p-8"
                    >
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
                        {/* Dropped while the keyboard is up, to leave room for the fields. */}
                        <p className="mt-2 text-ink-400 max-md:group-data-[kb]/kb:hidden">
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

                    <form
                      onSubmit={submit}
                      noValidate
                      className="flex min-h-0 flex-1 flex-col"
                    >
                      {/* On the sheet only this part scrolls; the send button
                          below stays pinned above the keyboard. */}
                      <div
                        data-scroll-area
                        className="space-y-5 p-6 max-md:min-h-0 max-md:flex-1 max-md:overflow-y-auto max-md:overscroll-contain sm:p-8"
                      >
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
                              inputMode="email"
                              maxLength={120}
                              autoComplete="email"
                              autoCapitalize="off"
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

                        <Field
                          id={`${id}-message`}
                          label="The project"
                          error={errors.message}
                        >
                          <textarea
                            {...describe(`${id}-message`, errors.message)}
                            name="message"
                            rows={5}
                            maxLength={2000}
                            enterKeyHint="enter"
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
                            {state.mailto ? (
                              <>
                                <a
                                  href={state.mailto}
                                  className="text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime"
                                >
                                  Open it in your mail app instead
                                </a>
                                ; everything you typed is already in the draft.
                              </>
                            ) : (
                              <>
                                Email me directly at{" "}
                                <a
                                  href={`mailto:${site.email}`}
                                  className="text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime"
                                >
                                  {site.email}
                                </a>
                                .
                              </>
                            )}
                          </p>
                        )}
                      </div>

                      <div className="flex shrink-0 items-center justify-between gap-4 px-6 pb-6 pt-4 max-md:border-t max-md:border-ink-800 sm:px-8 md:pb-8 md:pt-0">
                        <p className="font-mono text-[11px] text-ink-500 max-sm:hidden">
                          Replies come from {site.email}
                        </p>
                        <BrutalActionButton
                          type="submit"
                          disabled={pending}
                          className="max-sm:ml-auto"
                        >
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
