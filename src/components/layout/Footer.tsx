import { site } from "@/lib/content";
import { LiveClock } from "@/components/ui/LiveClock";
import { FooterName } from "@/components/layout/FooterName";
import { ArrowUp } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="relative mt-28 overflow-hidden border-t border-ink-800 md:mt-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        {/* Two columns until there is room for all four on one line. */}
        <div className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 whitespace-nowrap py-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500 sm:grid-cols-2 sm:gap-x-8 lg:flex lg:justify-between">
          <p className="order-1">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="order-3 sm:order-2 sm:justify-self-end">
            Local time <LiveClock seconds={false} className="text-paper" />
          </p>
          <p className="order-3 hidden sm:block">Designed &amp; built by me, in lime</p>
          <a
            href="#top"
            className="group order-2 inline-flex items-center gap-2 justify-self-end text-paper transition-colors hover:text-lime sm:order-4"
          >
            Back to top
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>

        <FooterName name={site.name} />
      </div>
    </footer>
  );
}
