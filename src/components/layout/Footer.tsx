import { site } from "@/lib/content";
import { LiveClock } from "@/components/ui/LiveClock";
import { FooterName } from "@/components/layout/FooterName";
import { ArrowUp } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="relative mt-28 overflow-hidden md:mt-36">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-ink-800 px-5 py-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500 md:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>
          Local time <LiveClock seconds={false} className="text-paper" />
        </p>
        <p className="hidden sm:block">Designed &amp; built by me, in lime</p>
        <a
          href="#top"
          className="group inline-flex items-center gap-2 text-paper transition-colors hover:text-lime"
        >
          Back to top
          <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>

      <FooterName name={site.name} />
    </footer>
  );
}
