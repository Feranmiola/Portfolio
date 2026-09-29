import { about, services, stack, type Service } from "@/lib/content";
import { Reveal, SplitText } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { Blocks, Chain, Check, Code, Phone } from "@/components/ui/Icons";

const icons: Record<Service["icon"], typeof Code> = {
  code: Code,
  chain: Chain,
  blocks: Blocks,
  phone: Phone,
};

export default function Services() {
  const [before, highlight, after] = about.leadParts;

  return (
    <section id="services" className="relative border-t border-ink-800 py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-12">
          <div>
            <Reveal className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
              <span className="text-lime">(02)</span>
              <span className="h-px w-10 bg-ink-600" />
              <span>Services</span>
            </Reveal>
            <SplitText
              as="h2"
              text="What I Do"
              className="font-dot-round block text-[clamp(3rem,10vw,8.5rem)] font-black uppercase leading-[0.86] tracking-tight text-paper"
            />
          </div>
          <Reveal delay={0.2} className="md:pb-2">
            <RotatingBadge />
          </Reveal>
        </div>

        <Reveal className="mt-14 md:mt-20">
          <p className="max-w-4xl text-[clamp(1.5rem,2.8vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.03em] text-paper">
            {before}
            <mark className="bg-lime px-1.5 text-lime-ink [box-decoration-break:clone]">
              {highlight}
            </mark>
            {after}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.title} delay={(i % 2) * 0.1} className="h-full">
                <Spotlight className="flex h-full flex-col rounded-[14px] border border-ink-800 bg-ink-900 p-7 transition-colors duration-500 hover:border-lime/40 md:p-9">
                  <div className="relative flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-[8px] border border-ink-700 bg-ink-950 text-lime">
                      <Icon size={22} />
                    </span>
                    <span className="font-dot-round text-5xl font-black leading-none text-ink-600 transition-colors duration-500 group-hover/spot:text-lime">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="relative mt-10 text-2xl font-semibold tracking-[-0.03em] md:text-[1.75rem]">
                    {service.title}
                  </h3>
                  <p className="relative mt-3 max-w-md leading-relaxed text-ink-400">
                    {service.summary}
                  </p>
                  <div className="min-h-8 flex-1" />
                  <ul className="relative space-y-3 border-t border-ink-800 pt-6">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-ink-300">
                        <Check size={16} className="mt-0.5 shrink-0 text-lime" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>

        {/* Who's behind it, and what's in the toolbox */}
        <div className="mt-20 grid gap-12 border-t border-ink-800 pt-14 md:mt-28 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-500">
              <span className="text-lime">✳</span> Behind the keyboard
            </p>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-400">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-500">
              <span className="text-lime">✳</span> Toolbox
            </p>
            <div className="mt-6 grid gap-px overflow-hidden rounded-[12px] border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-3">
              {stack.map((group) => (
                <div key={group.group} className="bg-ink-950 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">
                    {group.group}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-[4px] border border-ink-700 bg-ink-900 px-2.5 py-1 text-sm text-ink-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
