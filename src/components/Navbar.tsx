import { ArrowRight } from 'lucide-react';

export function BrandMark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="24" height="24" rx="6" className="fill-brand" />
      <path
        d="M6.5 16.5V8.5L12 13L17.5 8.5V16.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="7" r="1.25" fill="white" />
    </svg>
  );
}

export function Navbar() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-md"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a
            href="#"
            className="inline-flex min-w-0 items-center gap-2.5 rounded-md text-ink transition-opacity hover:opacity-85"
            aria-label="Meridian home"
          >
            <BrandMark />
            <span className="text-base font-semibold tracking-tight text-ink">
              Meridian
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="rounded-md text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              Outcomes
            </a>
            <a
              href="#estimator"
              className="rounded-md text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              Pricing &amp; Quote
            </a>
            <a
              href="#faq"
              className="rounded-md text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              FAQ
            </a>
          </nav>

          <a
            href="#estimator"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-hover"
          >
            <span>Get a quote</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </header>
    </>
  );
}
