import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-canvas-grid px-5">
      <div className="w-full max-w-xl">
        <p className="font-dot-round text-[clamp(6rem,30vw,12rem)] font-black leading-none text-lime">
          404
        </p>
        <div className="mt-6 overflow-hidden rounded-[10px] border border-ink-700 bg-ink-900 font-mono text-sm">
          <div className="flex gap-1.5 border-b border-ink-800 px-4 py-3" aria-hidden>
            <span className="size-3 rounded-full bg-lime" />
            <span className="size-3 rounded-full border border-ink-600" />
            <span className="size-3 rounded-full border border-ink-600" />
          </div>
          <div className="space-y-1 p-4 text-ink-300">
            <p>
              <span className="text-lime">➜</span> <span className="text-ink-500">~</span>{" "}
              <span className="text-paper">cd ./this-page</span>
            </p>
            <p>cd: no such file or directory</p>
            <p className="pt-2">
              <span className="text-lime">➜</span> <span className="text-ink-500">~</span>{" "}
              <Link
                href="/"
                className="text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime"
              >
                cd ~ (take me home)
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
