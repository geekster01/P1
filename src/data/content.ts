export interface MetricItem {
  value: string;
  label: string;
  detail: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type BillingCycle = 'monthly' | 'annual';

export interface QuoteEstimate {
  accounts: number;
  seats: number;
  billing: BillingCycle;
  tierName: 'Growth' | 'Scale' | 'Enterprise';
  monthlyPrice: number;
  annualSavings: number;
  includedFeatures: string[];
}

export const METRICS: MetricItem[] = [
  {
    value: '38%',
    label: 'Higher expansion conversion',
    detail: 'Average lift in qualified upsell pipeline within 90 days of deployment.',
  },
  {
    value: '12 min',
    label: 'Time to first live signal',
    detail: 'Connect Stripe, HubSpot, and your event stream with zero warehouse migrations.',
  },
  {
    value: '99.98%',
    label: 'Event pipeline reliability',
    detail: 'SOC 2 Type II audited ingestion built for high-volume B2B SaaS teams.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-setup',
    question: 'How quickly can our team connect Meridian to existing data sources?',
    answer:
      'Most teams go live in under 15 minutes. Connect your Segment, RudderStack, or direct JS SDK alongside Stripe and HubSpot or Salesforce—Meridian automatically resolves user events to company accounts without custom SQL.',
  },
  {
    id: 'faq-security',
    question: 'How does Meridian handle data privacy and enterprise security?',
    answer:
      'Meridian is SOC 2 Type II certified and GDPR ready. All data is encrypted in transit (TLS 1.3) and at rest (AES-256), with role-based access controls and EU or US regional data residency available on Scale and Enterprise plans.',
  },
  {
    id: 'faq-overages',
    question: 'What happens if our tracked accounts grow mid-billing cycle?',
    answer:
      'We never drop events or lock your dashboards. If you exceed your monthly tracked account tier, we notify your admin and give you a 14-day grace window to adjust your plan without surprise overage penalties.',
  },
  {
    id: 'faq-trial',
    question: 'Do we need engineering support or a credit card to get started?',
    answer:
      'No credit card is required to start a 14-day guided trial. You can test Meridian with our one-click sandbox or connect read-only billing and CRM integrations in minutes, and cancel or change tiers anytime.',
  },
];

export function calculateQuote(
  accounts: number,
  seats: number,
  billing: BillingCycle
): QuoteEstimate {
  let baseMonthly = 190;
  let tierName: QuoteEstimate['tierName'] = 'Growth';
  let includedFeatures = [
    'Real-time account health & activation scoring',
    'Bi-directional HubSpot & Slack alerts',
    '12-month retention & cohort history',
  ];

  if (accounts > 25000 || seats > 25) {
    tierName = 'Enterprise';
    baseMonthly = 690;
    includedFeatures = [
      'Custom PQL scoring & warehouse reverse ETL',
      'Salesforce, HubSpot, SSO/SAML & regional residency',
      'Dedicated solutions architect & 99.99% SLA',
    ];
  } else if (accounts > 7500 || seats > 10) {
    tierName = 'Scale';
    baseMonthly = 390;
    includedFeatures = [
      'Automated expansion & churn risk playbooks',
      'Salesforce, HubSpot & Slack workflow sync',
      'Unlimited self-serve cohort & funnel slices',
    ];
  }

  const accountAddOn = Math.max(0, Math.round((accounts - 2500) / 1000) * 14);
  const seatAddOn = Math.max(0, (seats - 5) * 18);
  const rawMonthly = baseMonthly + accountAddOn + seatAddOn;

  const monthlyPrice =
    billing === 'annual' ? Math.round(rawMonthly * 0.8) : rawMonthly;
  const annualSavings = (rawMonthly - Math.round(rawMonthly * 0.8)) * 12;

  return {
    accounts,
    seats,
    billing,
    tierName,
    monthlyPrice,
    annualSavings,
    includedFeatures,
  };
}
