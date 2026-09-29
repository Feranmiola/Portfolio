"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "@/components/ui/Icons";

const pad = (n: number) => String(n).padStart(2, "0");
const hostname = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/**
 * Project cards that pin and pile up as you scroll (from md up). Each card
 * shrinks and dims a little as the ones after it slide over the top.
 */
export function WorkStack({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const animate = useStacking() && !reduceMotion;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative mt-16 space-y-6 md:mt-6 md:space-y-0">
      {projects.map((project, i) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={i}
          total={projects.length}
          progress={scrollYProgress}
          animate={animate}
        />
      ))}
    </div>
  );
}

/** True from the md breakpoint up, where the cards pin and stack. */
function useStacking() {
  const [stacking, setStacking] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 48rem)");
    const update = () => setStacking(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return stacking;
}

function ProjectCard({
  project,
  index,
  total,
  progress,
  animate,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  animate: boolean;
}) {
  const depth = total - 1 - index;
  const range = [index / total, 1];
  const scale = useTransform(progress, range, [1, 1 - depth * 0.04]);
  const shade = useTransform(progress, range, [0, depth * 0.14]);

  return (
    <div className="md:sticky md:top-0 md:flex md:h-svh md:items-center md:pt-16">
      <motion.article
        style={{ scale: animate ? scale : 1, "--stack-offset": `${index * 18}px` } as MotionStyle}
        className="group relative grid w-full origin-top overflow-hidden rounded-[18px] border border-ink-700 bg-ink-900 transition-colors duration-500 hover:border-lime/40 md:top-[var(--stack-offset)] md:h-[min(640px,calc(100svh-8rem))] md:grid-cols-12"
      >
        {/* Copy */}
        <div className="relative z-10 flex flex-col p-6 sm:p-8 md:col-span-5 md:p-10">
          <p className="flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">
            <span className="font-dot-round text-5xl font-black leading-none tracking-normal text-lime">
              {pad(index + 1)}
            </span>
            <span>/ {pad(total)}</span>
          </p>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400 md:mt-auto md:pt-8">
            {project.category}
          </p>
          <h3 className="mt-3 text-[clamp(2.4rem,4.8vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-paper">
            {project.title}
          </h3>
          <p className="mt-5 max-w-md leading-relaxed text-ink-400">{project.description}</p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-ink-800 pt-5">
            <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-400">
              {project.tags.map((tag, i) => (
                <li key={tag} className="flex gap-3">
                  {i > 0 && (
                    <span aria-hidden className="text-ink-600">
                      ·
                    </span>
                  )}
                  {tag}
                </li>
              ))}
            </ul>
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-lime"
              >
                Visit
                <span className="grid size-10 place-items-center rounded-full border border-lime transition-all duration-300 group-hover/link:rotate-45 group-hover/link:bg-lime group-hover/link:text-lime-ink">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
                <span className="size-1.5 rounded-full bg-ink-500" />
                Private client build
              </span>
            )}
          </div>
        </div>

        {/* Screenshot in a browser frame, running off the card's corner */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] md:col-span-7 md:aspect-auto">
          <Frame
            project={project}
            className="absolute inset-x-5 -bottom-8 top-0 transition-transform duration-700 ease-out group-hover:-translate-y-2 md:-bottom-12 md:-right-12 md:left-0 md:top-10 md:group-hover:-translate-x-3 md:group-hover:-translate-y-3"
          />
        </div>

        <motion.div
          aria-hidden
          style={{ opacity: animate ? shade : 0 }}
          className="pointer-events-none absolute inset-0 z-20 bg-ink-950"
        />
      </motion.article>
    </div>
  );
}

function Frame({ project, className }: { project: Project; className?: string }) {
  const shared = cn(
    "flex flex-col overflow-hidden rounded-[12px] border border-ink-700 bg-ink-850 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]",
    className
  );
  const inner = (
    <>
      <div className="flex items-center gap-3 border-b border-ink-800 px-3 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-ink-600" />
          <span className="size-2.5 rounded-full bg-ink-600" />
          <span className="size-2.5 rounded-full bg-ink-600" />
        </div>
        <span className="flex-1 truncate rounded-[4px] bg-ink-900 px-3 py-1 text-center font-mono text-[11px] text-ink-400">
          {project.url ? hostname(project.url) : `${project.slug}.app`}
        </span>
      </div>
      <div className="relative flex-1">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    </>
  );

  return project.url ? (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.title}`}
      data-cursor="Visit"
      className={shared}
    >
      {inner}
    </a>
  ) : (
    <div className={shared}>{inner}</div>
  );
}
