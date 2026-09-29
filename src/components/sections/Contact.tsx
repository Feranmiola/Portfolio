import { contact, site, socials } from "@/lib/content";
import { Reveal, SplitText } from "@/components/ui/Reveal";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { StartProjectButton } from "@/components/contact/StartProjectButton";
import { ArrowUpRight, BrandIcon } from "@/components/ui/Icons";

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-ink-800 pt-28 md:pt-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
          <span className="text-lime">(03)</span>
          <span className="h-px w-10 bg-ink-600" />
          <span>Contact</span>
        </Reveal>

        <SplitText
          as="h2"
          text="Let's Talk"
          stagger={0.05}
          className="font-dot-round mt-6 block text-[clamp(4.5rem,14vw,13.5rem)] font-black uppercase leading-[0.8] tracking-[-0.02em] text-lime"
        />

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-6">
            <p className="max-w-xl text-2xl leading-snug tracking-[-0.02em] text-paper md:text-[1.75rem]">
              {contact.pitch}
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-10 block break-all text-[clamp(1.35rem,3vw,2.4rem)] font-semibold tracking-[-0.035em] text-paper underline decoration-ink-600 decoration-2 underline-offset-[10px] transition-colors hover:text-lime hover:decoration-lime"
            >
              {site.email}
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <StartProjectButton />
              <CopyEmail email={site.email} />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-500">
              Or find me on
            </p>
            <ul className="mt-4 border-t border-ink-800">
              {socials.map((social) => (
                <li key={social.id} className="border-b border-ink-800">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 px-3 py-5 transition-colors duration-300 hover:bg-lime hover:text-lime-ink"
                  >
                    <BrandIcon name={social.id} size={20} className="shrink-0" />
                    <span className="text-xl font-semibold tracking-[-0.02em]">
                      {social.label}
                    </span>
                    <span className="ml-auto hidden truncate font-mono text-xs text-ink-400 transition-colors group-hover:text-lime-ink/70 sm:block">
                      {social.handle}
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="ml-auto shrink-0 transition-transform duration-300 group-hover:rotate-45 sm:ml-0"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
