import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-x-clip border-b border-border bg-canvas py-12 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.16),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.10),transparent_50%)]"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="min-w-0 lg:col-span-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1 text-xs font-semibold tracking-wide text-accent uppercase">
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            B2B Revenue &amp; Product Analytics
          </p>

          <h1
            id="hero-heading"
            className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.1]"
          >
            Turn product usage into predictable revenue.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Meridian connects real-time customer behavior with your billing and
            CRM data—surfacing expansion-ready accounts and churn risks weeks
            before renewal.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#estimator"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition-colors hover:bg-brand-hover sm:text-base"
            >
              <span>Build your instant quote</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface/80 px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-subtle sm:text-base"
            >
              Explore outcomes
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-300 sm:text-sm">
            <li className="inline-flex items-center gap-1.5">
              <CheckCircle2
                className="h-4 w-4 shrink-0 text-accent"
                aria-hidden="true"
              />
              <span>14-day guided trial</span>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <CheckCircle2
                className="h-4 w-4 shrink-0 text-accent"
                aria-hidden="true"
              />
              <span>No credit card required</span>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <CheckCircle2
                className="h-4 w-4 shrink-0 text-accent"
                aria-hidden="true"
              />
              <span>SOC 2 Type II ready</span>
            </li>
          </ul>
        </div>

        <div className="min-w-0 lg:col-span-6">
          <img
            src="/hero-meridian.webp"
            alt="Isometric glass analytics panels illustrating Meridian's B2B product usage trends, cohort growth curves, and revenue expansion insights"
            loading="eager"
            fetchPriority="high"
            width={1376}
            height={768}
            className="block w-full h-auto aspect-[1376/768] object-contain rounded-2xl border border-slate-800/80 bg-[#0f172a] shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
