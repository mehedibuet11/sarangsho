// app/coming-soon/page.tsx
"use client"
export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-20 -right-32 h-[28rem] w-[28rem] rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* content */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-14">
        <div className="w-full">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              We’re building something new
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Coming Soon...
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Our website is under construction. We’re preparing a better
              experience—launching very soon.
            </p>

            {/* email notify */}
            {/* <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-6">
              <p className="text-sm text-white/70">
                Get notified when we launch:
              </p>

              <form
                className="mt-3 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/20 focus:ring-2 focus:ring-indigo-500/30"
                />
                <button
                  type="submit"
                  className="h-12 rounded-xl bg-white px-5 text-sm font-medium text-slate-900 transition hover:bg-white/90"
                >
                  Notify me
                </button>
              </form>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-white/50">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  No spam
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Unsubscribe anytime
                </span>
              </div>
            </div> */}

            {/* quick links */}
            {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/10"
              >
                Facebook
              </a>
              <a
                href="#"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/10"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/10"
              >
                Contact
              </a>
            </div> */}

            <p className="mt-10 text-xs text-white/40">
              © {new Date().getFullYear()} Sarangsho. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
