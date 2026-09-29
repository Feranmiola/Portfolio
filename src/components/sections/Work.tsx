import { projects } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkStack } from "./WorkStack";

export default function Work() {
  return (
    <section id="work" className="relative py-28 md:pb-16 md:pt-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHeading
          index="01"
          label="Selected work"
          title="Featured Work"
          aside={
            <>
              Climate tech, healthcare, enterprise dashboards and Web3 games.
              Products built end to end and shipped to real users.
              <span className="mt-4 block font-mono text-xs uppercase tracking-[0.2em] text-ink-500">
                <span className="text-lime">{String(projects.length).padStart(2, "0")}</span> projects
              </span>
            </>
          }
        />
        <WorkStack projects={projects} />
      </div>
    </section>
  );
}
