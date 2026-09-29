"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useLenis } from "lenis/react";
import { nav, site, socials } from "@/lib/content";
import { cn } from "@/lib/cn";
import { LiveClock } from "@/components/ui/LiveClock";
import { BrutalButton } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/Icons";

/** Tracks which nav section currently sits in the middle band of the viewport. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    targets.forEach((el) => observer.observe(el));

    // Clear the highlight while the hero is on screen.
    const hero = document.getElementById("top");
    const heroObserver = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActive(null),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    if (hero) heroObserver.observe(hero);

    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, [ids]);

  return active;
}

const sectionIds = nav.map((item) => item.id);

export default function Header() {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // Freeze the page behind the mobile menu and keep focus inside it.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open, lenis]);

  // Lenis ignores scrollTo while stopped, so restart it before jumping.
  const goTo = (id: string) => (event: React.MouseEvent) => {
    if (lenis) {
      event.preventDefault();
      lenis.start();
      lenis.scrollTo(`#${id}`);
    }
    setOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-800 bg-ink-950/75 backdrop-blur-md">
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-lime"
          style={{ scaleX: progress }}
        />

        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 md:px-8">
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label={`${site.name}, back to top`}
          >
            <span className="grid size-9 place-items-center rounded-[4px] bg-lime font-mono text-sm font-bold text-lime-ink transition-transform duration-300 group-hover:-rotate-6">
              {site.initials}
            </span>
            <span className="hidden font-medium tracking-tight sm:block">
              {site.name}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-[6px] border border-ink-800 bg-ink-900/60 p-1">
              {nav.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative flex items-center gap-2 rounded-[4px] px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-200",
                        isActive
                          ? "text-lime-ink"
                          : "text-ink-300 hover:text-paper"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-[4px] bg-lime"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span
                        className={cn(
                          "relative",
                          isActive ? "text-lime-ink/60" : "text-ink-500"
                        )}
                      >
                        {item.index}
                      </span>
                      <span className="relative">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-400 md:flex">
              <span className="text-ink-500">{site.location}</span>
              <LiveClock className="text-paper" />
            </div>
            <BrutalButton href="#contact" size="sm" className="hidden sm:inline-flex">
              Let&apos;s talk
            </BrutalButton>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[60] grid size-10 place-items-center rounded-[4px] border border-ink-700 lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[1.5px] w-full bg-paper transition-transform duration-300",
                    open && "translate-y-[5px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[1.5px] w-full bg-paper transition-transform duration-300",
                    open && "-translate-y-[5.5px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink-950 bg-canvas-grid px-5 pb-8 pt-24 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="flex-1">
              <ul className="space-y-2">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
                  >
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={`#${item.id}`}
                      onClick={goTo(item.id)}
                      className="group flex items-baseline gap-4 border-b border-ink-800 py-3"
                    >
                      <span className="font-mono text-xs text-lime">{item.index}</span>
                      <span className="font-dot-round text-6xl font-black uppercase leading-none text-paper transition-colors group-hover:text-lime">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ul className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm">
                {socials.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-ink-300 hover:text-lime"
                    >
                      {social.label}
                      <ArrowUpRight size={14} />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-ink-400">
                <span>{site.location}</span>
                <LiveClock className="text-paper" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
