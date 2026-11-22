import { METRICS } from '../data/content';

export function MetricStrip() {
  return (
    <section
      aria-label="Key platform performance metrics"
      className="border-b border-border bg-surface py-10 sm:py-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {METRICS.map((metric, index) => (
            <div
              key={metric.label}
              className={`flex flex-col py-6 first:pt-0 last:pb-0 sm:py-0 ${
                index === 0
                  ? 'sm:pr-8'
                  : index === 1
                    ? 'sm:px-8'
                    : 'sm:pl-8'
              }`}
            >
              <dt className="mt-1.5 text-sm font-semibold text-ink">
                {metric.label}
              </dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-brand-ink tabular-nums sm:text-4xl">
                {metric.value}
              </dd>
              <dd className="mt-2 text-sm leading-relaxed text-ink-muted">
                {metric.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
