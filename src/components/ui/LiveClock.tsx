"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: site.timeZone,
});

/**
 * Local time in the site owner's time zone. Renders a placeholder on the
 * server so the markup never disagrees with the client during hydration.
 */
export function LiveClock({
  seconds = true,
  className,
}: {
  seconds?: boolean;
  className?: string;
}) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const time = formatter.format(new Date());
      setNow(seconds ? time : time.slice(0, 5));
    };
    tick();
    const id = window.setInterval(tick, seconds ? 1000 : 15000);
    return () => window.clearInterval(id);
  }, [seconds]);

  return (
    <time className={className} suppressHydrationWarning>
      <span className="tabular-nums">
        {now ?? (seconds ? "--:--:--" : "--:--")}
      </span>{" "}
      {site.timeZoneLabel}
    </time>
  );
}
