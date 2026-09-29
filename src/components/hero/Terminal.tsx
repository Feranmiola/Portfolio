"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { about, projects, site, socials, stack } from "@/lib/content";

type Entry = { id: number; kind: "cmd" | "out"; content: ReactNode };

const MAX_ENTRIES = 80;

const Hl = ({ children }: { children: ReactNode }) => (
  <span className="text-lime">{children}</span>
);

const ExtLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-lime underline decoration-lime/40 underline-offset-2 hover:decoration-lime"
  >
    {children}
  </a>
);

/** The intro that types itself out the first time the terminal is seen. */
const intro: Array<{ cmd: string; out: ReactNode[] }> = [
  {
    cmd: "whoami",
    out: [
      <>
        <Hl>{site.name.toLowerCase()}</Hl>, {site.role.toLowerCase()}
      </>,
    ],
  },
  {
    cmd: "cat stack.txt",
    out: ["react · next.js · typescript · solidity · luau · react native"],
  },
  {
    cmd: "ls ./shipped",
    out: [projects.map((p) => `${p.slug}/`).join("  ")],
  },
  {
    cmd: "npx create-app your-idea",
    out: [
      <>
        <span className="text-ink-500">?</span> what are we building?{" "}
        <span className="text-ink-400">› web app · dApp · roblox experience · mobile app</span>
      </>,
      <>
        <Hl>✔</Hl> scaffolded. type <Hl>hire</Hl> to start.
      </>,
    ],
  },
];

const openTargets: Record<string, string> = Object.fromEntries([
  ...socials.map((s) => [s.id, s.href] as const),
  ...projects.filter((p) => p.url).map((p) => [p.slug, p.url as string] as const),
]);

const COMMANDS: Array<[string, string]> = [
  ["about", "a little about me"],
  ["projects", "things i've shipped"],
  ["stack", "tools i build with"],
  ["socials", "where to find me"],
  ["roblox", "a peek at the Luau side"],
  ["contact", "how to reach me"],
  ["open <name>", "open a project or profile"],
  ["hire", "you know you want to"],
  ["clear", "wipe the screen"],
];

export function Terminal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);
  const pastCommands = useRef<string[]>([]);
  const historyCursor = useRef(-1);

  const inView = useInView(rootRef, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();

  const [entries, setEntries] = useState<Entry[]>([]);
  const [typing, setTyping] = useState("");
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState("");

  const push = useCallback((kind: Entry["kind"], content: ReactNode) => {
    setEntries((list) => {
      const next = [...list, { id: nextId.current++, kind, content }];
      return next.length > MAX_ENTRIES ? next.slice(-MAX_ENTRIES) : next;
    });
  }, []);

  // Play the intro once the terminal scrolls into view.
  useEffect(() => {
    if (!inView) return;
    setEntries([]);

    if (reduceMotion) {
      intro.forEach(({ cmd, out }) => {
        push("cmd", cmd);
        out.forEach((line) => push("out", line));
      });
      setReady(true);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, ms)));

    (async () => {
      await wait(500);
      for (const { cmd, out } of intro) {
        for (let i = 1; i <= cmd.length; i++) {
          if (cancelled) return;
          setTyping(cmd.slice(0, i));
          await wait(40 + Math.random() * 60);
        }
        await wait(260);
        if (cancelled) return;
        setTyping("");
        push("cmd", cmd);
        for (const line of out) {
          await wait(200);
          if (cancelled) return;
          push("out", line);
        }
        await wait(550);
      }
      if (!cancelled) {
        push("out", <span className="text-ink-500">type <Hl>help</Hl> to look around.</span>);
        setReady(true);
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, [inView, reduceMotion, push]);

  // Keep the newest line in view (inside the terminal only, never the page).
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [entries, typing]);

  const hire = () => {
    push("out", <><Hl>permission granted.</Hl> taking you to contact…</>);
    window.setTimeout(() => {
      if (lenis) lenis.scrollTo("#contact");
      else document.getElementById("contact")?.scrollIntoView();
    }, 700);
  };

  const run = (raw: string) => {
    const input = raw.trim();
    push("cmd", input);
    if (!input) return;

    pastCommands.current = [...pastCommands.current.slice(-19), input];
    historyCursor.current = -1;

    const [name, ...args] = input.split(/\s+/);
    const command = name.toLowerCase();
    const arg = args.join(" ").toLowerCase();

    switch (command) {
      case "help":
        push(
          "out",
          <div className="grid grid-cols-[auto_1fr] gap-x-4">
            {COMMANDS.map(([cmd, desc]) => (
              <div key={cmd} className="contents">
                <Hl>{cmd}</Hl>
                <span className="text-ink-400">{desc}</span>
              </div>
            ))}
          </div>
        );
        break;
      case "whoami":
        push("out", `${site.name.toLowerCase()}, ${site.role.toLowerCase()}`);
        break;
      case "about":
        push("out", about.lead);
        break;
      case "ls":
      case "projects":
        push(
          "out",
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                <Hl>{p.slug}/</Hl>{" "}
                <span className="text-ink-400">{p.category.toLowerCase()}</span>
                {p.url && (
                  <>
                    {" "}
                    <ExtLink href={p.url}>↗</ExtLink>
                  </>
                )}
              </li>
            ))}
          </ul>
        );
        break;
      case "stack":
        push(
          "out",
          <ul>
            {stack.map((group) => (
              <li key={group.group}>
                <Hl>{group.group.toLowerCase()}:</Hl> {group.items.join(", ").toLowerCase()}
              </li>
            ))}
          </ul>
        );
        break;
      case "socials":
        push(
          "out",
          <ul>
            {socials.map((s) => (
              <li key={s.id}>
                <span className="inline-block w-20 text-ink-400">{s.id}</span>
                <ExtLink href={s.href}>{s.handle}</ExtLink>
              </li>
            ))}
          </ul>
        );
        break;
      case "roblox":
      case "luau":
        push(
          "out",
          <pre className="whitespace-pre-wrap">
            <span className="text-ink-500">-- ServerScriptService/Welcome.server.lua</span>
            {"\n"}
            <Hl>local</Hl> Players = game:GetService(<span className="text-paper">&quot;Players&quot;</span>)
            {"\n"}Players.PlayerAdded:Connect(<Hl>function</Hl>(player)
            {"\n"}    print((<span className="text-paper">&quot;welcome, %s. let&apos;s build.&quot;</span>):format(player.Name))
            {"\n"}<Hl>end</Hl>)
          </pre>
        );
        break;
      case "contact":
      case "email":
        push(
          "out",
          <>
            <ExtLink href={`mailto:${site.email}`}>{site.email}</ExtLink>
            <span className="text-ink-400"> (or type </span>
            <Hl>hire</Hl>
            <span className="text-ink-400">)</span>
          </>
        );
        break;
      case "open": {
        const url = openTargets[arg];
        if (url) {
          push("out", <>opening <Hl>{arg}</Hl>…</>);
          window.open(url, "_blank", "noopener,noreferrer");
        } else {
          push(
            "out",
            <span className="text-ink-400">
              open: try one of {Object.keys(openTargets).join(", ")}
            </span>
          );
        }
        break;
      }
      case "hire":
        hire();
        break;
      case "sudo":
        if (arg.startsWith("hire")) hire();
        else push("out", "nice try. this incident will be reported.");
        break;
      case "clear":
        setEntries([]);
        break;
      case "date":
        push(
          "out",
          new Date().toLocaleString("en-GB", {
            timeZone: site.timeZone,
            dateStyle: "full",
            timeStyle: "short",
          }) + ` (${site.timeZoneLabel})`
        );
        break;
      case "echo":
        push("out", args.join(" "));
        break;
      case "rm":
        push("out", "permission denied. i'm quite attached to my files.");
        break;
      case "exit":
        push("out", "there's no escape. try hire instead.");
        break;
      case "theme":
        push("out", "one theme only: lime on black.");
        break;
      case "coffee":
        push("out", "brewing… done. productivity +10.");
        break;
      default:
        push(
          "out",
          <span className="text-ink-400">
            command not found: {name.slice(0, 32)}. type <Hl>help</Hl>.
          </span>
        );
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const past = pastCommands.current;
    if (event.key === "Enter") {
      event.preventDefault();
      run(value);
      setValue("");
    } else if (event.key === "ArrowUp" && past.length) {
      event.preventDefault();
      const cursor =
        historyCursor.current === -1
          ? past.length - 1
          : Math.max(0, historyCursor.current - 1);
      historyCursor.current = cursor;
      setValue(past[cursor]);
    } else if (event.key === "ArrowDown" && historyCursor.current !== -1) {
      event.preventDefault();
      const cursor = historyCursor.current + 1;
      historyCursor.current = cursor >= past.length ? -1 : cursor;
      setValue(cursor >= past.length ? "" : past[cursor]);
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setEntries([]);
    }
  };

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-[10px] border border-ink-700 bg-ink-900/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(200,245,60,0.04)] backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-ink-800 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-3 rounded-full bg-lime" />
          <span className="size-3 rounded-full border border-ink-600" />
          <span className="size-3 rounded-full border border-ink-600" />
        </div>
        <p className="flex-1 text-center font-mono text-xs text-ink-400">
          feranmi@portfolio: ~
        </p>
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-500">
          zsh
        </span>
      </div>

      <div
        ref={bodyRef}
        data-lenis-prevent
        onClick={() => {
          // Leave text selection alone; otherwise send clicks to the prompt.
          if (!window.getSelection()?.toString()) {
            inputRef.current?.focus({ preventScroll: true });
          }
        }}
        className="h-[300px] overflow-y-auto overscroll-contain px-4 py-4 font-mono text-[13px] leading-relaxed text-ink-300 [scrollbar-width:none] sm:h-[340px]"
      >
        <div role="log" aria-live="polite" aria-label="Terminal output">
          {entries.map((entry) =>
            entry.kind === "cmd" ? (
              <p key={entry.id} className="mt-2 first:mt-0">
                <Prompt />
                <span className="text-paper">{entry.content}</span>
              </p>
            ) : (
              <div key={entry.id} className="break-words">
                {entry.content}
              </div>
            )
          )}
        </div>

        {!ready && (
          <p className={entries.length ? "mt-2" : undefined} aria-hidden>
            <Prompt />
            <span className="text-paper">{typing}</span>
            <Caret />
          </p>
        )}

        {ready && (
          <label className="mt-2 flex items-center">
            <Prompt />
            <span className="sr-only">Type a terminal command</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={onKeyDown}
              maxLength={80}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
              className="min-w-0 flex-1 bg-transparent text-paper caret-lime outline-none placeholder:text-ink-600"
              placeholder="help"
            />
          </label>
        )}
      </div>
    </div>
  );
}

function Prompt() {
  return (
    <span aria-hidden className="select-none">
      <span className="text-lime">➜</span>
      <span className="text-ink-500"> ~ </span>
    </span>
  );
}

function Caret() {
  return (
    <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] animate-blink bg-lime" />
  );
}
