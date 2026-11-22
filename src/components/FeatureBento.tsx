import {
  Activity,
  ArrowUpRight,
  GitBranch,
  Layers,
  ShieldAlert,
} from 'lucide-react';

const EXPANSION_SIGNALS = [
  {
    account: 'Northstar Cloud',
    trigger: '94% seat capacity reached',
    badge: '+$24k ARR opp',
  },
  {
    account: 'Kestrel Freight',
    trigger: 'API usage up 3.1x in 14d',
    badge: 'PQL Score 92',
  },
  {
    account: 'Verve Health',
    trigger: '4 new exec stakeholders active',
    badge: 'Renewal in 45d',
  },
];

const CRM_STEPS = [
  { label: 'Product Events', detail: 'SDK & Warehouse' },
  { label: 'Meridian Engine', detail: 'Health & PQL Score' },
  { label: 'GTM Destinations', detail: 'HubSpot · Salesforce · Slack' },
];

export function FeatureBento() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="scroll-mt-20 border-b border-border bg-canvas py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-brand-ink uppercase">
            Built for measurable outcomes
          </p>
          <h2
            id="features-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Every signal your revenue team needs, without data bottlenecks.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Stop digging through disconnected BI dashboards. Meridian turns raw
            product events into clear next actions for Product, CS, and Sales.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1: 2-column wide bento card */}
          <article className="flex min-w-0 flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-xs sm:p-8 md:col-span-2">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand-ink">
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">
                Spot expansion-ready accounts automatically
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                Detect workspaces approaching seat limits, adopting premium
                workflows, or adding new departments—so AEs engage at peak
                buying intent.
              </p>
            </div>

            <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-canvas">
              {EXPANSION_SIGNALS.map((signal) => (
                <div
                  key={signal.account}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{signal.account}</p>
                    <p className="text-xs text-ink-muted">{signal.trigger}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
                    {signal.badge}
                  </span>
                </div>
              ))}
            </div>
          </article>

          {/* Card 2: 1-column bento card */}
          <article className="flex min-w-0 flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-xs sm:p-8 md:col-span-1">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <ShieldAlert className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">
                Catch churn risk 30 days early
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
                Receive proactive alerts when champion logins dip or core
                feature adoption slides—long before cancellation tickets arrive.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-canvas p-4">
              <div className="flex items-center justify-between text-xs font-medium text-ink-muted">
                <span>Account Health Index</span>
                <span className="font-semibold text-accent">Monitored 24/7</span>
              </div>
              <div className="mt-3 space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-ink">Healthy cohorts</span>
                    <span className="tabular-nums text-ink-muted">84%</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-border">
                    <div className="h-full w-[84%] rounded-full bg-accent" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-ink">Early warning</span>
                    <span className="tabular-nums text-ink-muted">16%</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-border">
                    <div className="h-full w-[16%] rounded-full bg-brand" />
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Card 3: 1-column bento card */}
          <article className="flex min-w-0 flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-xs sm:p-8 md:col-span-1">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand-ink">
                <Layers className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">
                Answer cohort questions without SQL
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
                Filter retention, activation velocity, and feature stickiness by
                plan tier or ACV in seconds—no analyst queue required.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-canvas p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                <Activity className="h-4 w-4 text-brand-ink" aria-hidden="true" />
                <span>Week-8 Retention by Tier</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg border border-border bg-surface px-2 py-2.5">
                  <p className="text-xs text-ink-muted">Growth</p>
                  <p className="mt-0.5 text-sm font-bold text-ink tabular-nums">78%</p>
                </div>
                <div className="rounded-lg border border-border bg-surface px-2 py-2.5">
                  <p className="text-xs text-ink-muted">Scale</p>
                  <p className="mt-0.5 text-sm font-bold text-brand-ink tabular-nums">89%</p>
                </div>
                <div className="rounded-lg border border-border bg-surface px-2 py-2.5">
                  <p className="text-xs text-ink-muted">Ent.</p>
                  <p className="mt-0.5 text-sm font-bold text-accent tabular-nums">95%</p>
                </div>
              </div>
            </div>
          </article>

          {/* Card 4: 2-column wide bento card */}
          <article className="flex min-w-0 flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-xs sm:p-8 md:col-span-2">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <GitBranch className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">
                Sync live buying signals straight to your CRM
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                Keep account owners working inside the tools they already live
                in. Meridian writes enriched usage milestones directly to
                HubSpot, Salesforce, and Slack channels in real time.
              </p>
            </div>

            <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {CRM_STEPS.map((step, idx) => (
                <li
                  key={step.label}
                  className="rounded-xl border border-border bg-canvas p-4"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-ink">
                    {idx + 1}
                  </span>
                  <p className="mt-2.5 text-sm font-semibold text-ink">
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-muted">{step.detail}</p>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </div>
    </section>
  );
}
