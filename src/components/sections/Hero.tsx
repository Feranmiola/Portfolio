import { heroAreas, heroIntro, heroRoles } from "@/lib/content";
import { DotField } from "@/components/hero/DotField";
import { LedName } from "@/components/hero/LedName";
import { Typewriter } from "@/components/hero/Typewriter";
import { Terminal } from "@/components/hero/Terminal";
import { Reveal } from "@/components/ui/Reveal";
import { BrutalButton, GhostButton } from "@/components/ui/Button";
import { ArrowDownRight } from "@/components/ui/Icons";

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden pt-16">
      <DotField className="pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black_30%,transparent_100%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24">
        <Reveal y={12}>
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400 sm:gap-x-3 sm:text-xs sm:tracking-[0.2em]">
            <span className="text-ink-600">{"//"}</span>
            {heroAreas.map((area, i) => (
              <span key={area} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden className="text-ink-600">
                    ·
                  </span>
                )}
                {area}
              </span>
            ))}
          </p>
        </Reveal>

        <div className="mt-6 md:mt-8">
          <LedName first="Feranmi" last="Ola" />
        </div>

        <div className="mt-16 grid gap-14 md:mt-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              <p className="min-h-[2.2em] text-[clamp(1.9rem,3.6vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                I build
                <br />
                <Typewriter words={heroRoles} />
              </p>
              <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-400">
                {heroIntro}
              </p>
            </Reveal>

            <Reveal delay={0.35} className="mt-10 flex flex-wrap items-center gap-4">
              <BrutalButton href="#work">
                See my work <ArrowDownRight size={16} />
              </BrutalButton>
              <GhostButton href="#contact">Get in touch</GhostButton>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <Terminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
