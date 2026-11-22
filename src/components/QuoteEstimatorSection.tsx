import { useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Loader2,
  Minus,
  Plus,
} from 'lucide-react';
import { BillingCycle, calculateQuote } from '../data/content';

interface FormValues {
  fullName: string;
  email: string;
  company: string;
  goal: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  company?: string;
  goal?: string;
}

interface SubmittedLead extends FormValues {
  referenceId: string;
  tierName: string;
  accounts: number;
  seats: number;
  billing: BillingCycle;
  monthlyPrice: number;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PRIMARY_GOALS = [
  'Identify expansion-ready accounts',
  'Reduce customer churn before renewal',
  'Unify product usage & billing data',
  'Replace slow manual SQL reporting',
];

function validateField(name: keyof FormValues, value: string): string | undefined {
  const trimmed = value.trim();

  if (name === 'fullName') {
    if (!trimmed) return 'Please enter your full name.';
    if (trimmed.length < 2) return 'Name must be at least 2 characters.';
  }

  if (name === 'email') {
    if (!trimmed) return 'Please enter your work email address.';
    if (!EMAIL_PATTERN.test(trimmed)) {
      return 'Enter a valid email address (for example, alex@company.com).';
    }
  }

  if (name === 'company') {
    if (!trimmed) return 'Please enter your company name.';
    if (trimmed.length < 2) return 'Company name must be at least 2 characters.';
  }

  if (name === 'goal') {
    if (!trimmed) return 'Please choose your primary analytics goal.';
  }

  return undefined;
}

function validateAll(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  (Object.keys(values) as Array<keyof FormValues>).forEach((key) => {
    const err = validateField(key, values[key]);
    if (err) errors[key] = err;
  });
  return errors;
}

export function QuoteEstimatorSection() {
  // 3-input estimator state
  const [accounts, setAccounts] = useState<number>(10000);
  const [seats, setSeats] = useState<number>(10);
  const [seatInput, setSeatInput] = useState<string>('10');
  const [billing, setBilling] = useState<BillingCycle>('annual');

  const estimate = useMemo(
    () => calculateQuote(accounts, seats, billing),
    [accounts, seats, billing]
  );

  // Lead form state
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    email: '',
    company: '',
    goal: '',
  });
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<SubmittedLead | null>(null);

  const submitLockRef = useRef(false);
  const monthlyRadioRef = useRef<HTMLButtonElement>(null);
  const annualRadioRef = useRef<HTMLButtonElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const goalRef = useRef<HTMLSelectElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  const handleSeatDelta = (delta: number) => {
    setSeats((prev) => {
      const next = Math.min(50, Math.max(5, prev + delta));
      setSeatInput(String(next));
      return next;
    });
  };

  const handleBillingKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown'
    ) {
      event.preventDefault();
      const next: BillingCycle = billing === 'monthly' ? 'annual' : 'monthly';
      setBilling(next);
      if (next === 'monthly') monthlyRadioRef.current?.focus();
      else annualRadioRef.current?.focus();
    }
  };

  const handleFieldChange = (field: keyof FormValues, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (touched[field] || errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, nextValue),
      }));
    }
  };

  const handleFieldBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, values[field]),
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitLockRef.current || isSubmitting) return;

    const validationErrors = validateAll(values);
    setTouched({ fullName: true, email: true, company: true, goal: true });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.fullName) fullNameRef.current?.focus();
      else if (validationErrors.email) emailRef.current?.focus();
      else if (validationErrors.company) companyRef.current?.focus();
      else if (validationErrors.goal) goalRef.current?.focus();
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);

    const snapshot = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      goal: values.goal,
      tierName: estimate.tierName,
      accounts: estimate.accounts,
      seats: estimate.seats,
      billing: estimate.billing,
      monthlyPrice: estimate.monthlyPrice,
    };

    window.setTimeout(() => {
      const refNum = Math.floor(1000 + Math.random() * 9000);
      setSubmittedLead({
        ...snapshot,
        referenceId: `MRD-${refNum}`,
      });
      setIsSubmitting(false);
      submitLockRef.current = false;
      window.requestAnimationFrame(() => {
        confirmationRef.current?.focus();
      });
    }, 900);
  };

  const handleReset = () => {
    setSubmittedLead(null);
    setValues({ fullName: '', email: '', company: '', goal: '' });
    setTouched({});
    setErrors({});
    window.requestAnimationFrame(() => {
      fullNameRef.current?.focus();
    });
  };

  return (
    <section
      id="estimator"
      aria-labelledby="estimator-heading"
      className="scroll-mt-20 border-b border-border bg-surface py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-brand-ink uppercase">
            Transparent pricing &amp; tailored quote
          </p>
          <h2
            id="estimator-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Estimate your plan in seconds.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Adjust your volume, seats, and billing preference to calculate an
            instant quote, then lock in your estimate with a 14-day guided
            trial.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left column: 3-Input Instant Quote Estimator */}
          <div className="min-w-0 rounded-2xl border border-border bg-canvas p-6 sm:p-8 lg:col-span-6">
            <h3 className="text-lg font-semibold text-ink">
              1. Configure your workspace
            </h3>

            <div className="mt-6 space-y-6">
              {/* Input 1: Monthly Tracked Accounts */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <label
                    htmlFor="tracked-accounts"
                    className="text-sm font-medium text-ink"
                  >
                    Monthly tracked accounts
                  </label>
                  <output
                    htmlFor="tracked-accounts"
                    className="text-sm font-semibold text-brand-ink tabular-nums"
                  >
                    {accounts.toLocaleString()} accounts
                  </output>
                </div>
                <input
                  id="tracked-accounts"
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={accounts}
                  onChange={(e) => setAccounts(Number(e.target.value))}
                  disabled={isSubmitting}
                  className="meridian-slider mt-3"
                />
                <div className="mt-1.5 flex justify-between text-xs text-ink-muted tabular-nums">
                  <span>1,000</span>
                  <span>25,000</span>
                  <span>50,000</span>
                </div>
              </div>

              {/* Input 2: Workspace Seats */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <label
                      htmlFor="workspace-seats"
                      className="text-sm font-medium text-ink"
                    >
                      Team seats
                    </label>
                    <p className="text-xs text-ink-muted">
                      Product, RevOps, CS &amp; Sales users (5–50)
                    </p>
                  </div>
                  <div className="inline-flex items-center rounded-lg border border-border bg-surface p-1">
                    <button
                      type="button"
                      onClick={() => handleSeatDelta(-1)}
                      disabled={seats <= 5 || isSubmitting}
                      aria-label="Decrease team seats"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink transition-colors hover:bg-subtle disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <input
                      id="workspace-seats"
                      type="number"
                      min={5}
                      max={50}
                      value={seatInput}
                      disabled={isSubmitting}
                      onChange={(e) => {
                        const raw = e.target.value;
                        setSeatInput(raw);
                        const parsed = Number(raw);
                        if (raw !== '' && !Number.isNaN(parsed)) {
                          setSeats(Math.min(50, Math.max(5, Math.round(parsed))));
                        }
                      }}
                      onBlur={() => {
                        const parsed = Number(seatInput);
                        const clamped =
                          seatInput === '' || Number.isNaN(parsed)
                            ? 5
                            : Math.min(50, Math.max(5, Math.round(parsed)));
                        setSeats(clamped);
                        setSeatInput(String(clamped));
                      }}
                      className="w-12 bg-transparent text-center text-sm font-semibold text-ink tabular-nums focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleSeatDelta(1)}
                      disabled={seats >= 50 || isSubmitting}
                      aria-label="Increase team seats"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink transition-colors hover:bg-subtle disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Input 3: Billing Cadence */}
              <fieldset disabled={isSubmitting}>
                <legend className="text-sm font-medium text-ink">
                  Billing cadence
                </legend>
                <div
                  role="radiogroup"
                  aria-label="Billing cadence"
                  className="mt-2.5 grid grid-cols-2 gap-2 rounded-xl border border-border bg-surface p-1.5"
                >
                  <button
                    ref={monthlyRadioRef}
                    type="button"
                    role="radio"
                    aria-checked={billing === 'monthly'}
                    tabIndex={billing === 'monthly' ? 0 : -1}
                    onClick={() => setBilling('monthly')}
                    onKeyDown={handleBillingKeyDown}
                    className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                      billing === 'monthly'
                        ? 'bg-brand text-white shadow-xs'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    ref={annualRadioRef}
                    type="button"
                    role="radio"
                    aria-checked={billing === 'annual'}
                    tabIndex={billing === 'annual' ? 0 : -1}
                    onClick={() => setBilling('annual')}
                    onKeyDown={handleBillingKeyDown}
                    className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                      billing === 'annual'
                        ? 'bg-brand text-white shadow-xs'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    <span>Annual</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
                        billing === 'annual'
                          ? 'bg-white/20 text-white'
                          : 'bg-accent-soft text-accent'
                      }`}
                    >
                      -20%
                    </span>
                  </button>
                </div>
              </fieldset>
            </div>

            {/* Live Calculated Summary Card */}
            <div
              aria-live="polite"
              className="mt-8 rounded-xl border border-border bg-surface p-5 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-ink">
                  Recommended: {estimate.tierName}
                </span>
                {billing === 'annual' && (
                  <span className="text-xs font-semibold text-accent">
                    Save ${estimate.annualSavings.toLocaleString()}/year
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold tracking-tight text-ink tabular-nums">
                  ${estimate.monthlyPrice.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-ink-muted">
                  / month {billing === 'annual' ? '(billed annually)' : '(billed monthly)'}
                </span>
              </div>

              <ul className="mt-5 space-y-2.5 border-t border-border pt-4">
                {estimate.includedFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-ink-muted"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: Connected Lead Capture Form */}
          <div className="min-w-0 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8 lg:col-span-6">
            {submittedLead ? (
              <div
                ref={confirmationRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="py-4 focus:outline-none"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-2xl font-bold tracking-tight text-ink">
                  Your estimate is locked in, {submittedLead.fullName}.
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
                  We&apos;ve sent a copy of your custom{' '}
                  <strong className="font-semibold text-ink">
                    {submittedLead.tierName}
                  </strong>{' '}
                  quote and sandbox invite to{' '}
                  <strong className="break-all font-semibold text-ink">
                    {submittedLead.email}
                  </strong>
                  . A solutions specialist will reach out within one business
                  day.
                </p>

                <dl className="mt-6 space-y-3 rounded-xl border border-border bg-canvas p-4 text-sm">
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-ink-muted">Reference ID</dt>
                    <dd className="font-mono font-semibold text-ink">
                      {submittedLead.referenceId}
                    </dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-ink-muted">Company</dt>
                    <dd className="font-semibold text-ink">
                      {submittedLead.company}
                    </dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-ink-muted">Configured Plan</dt>
                    <dd className="font-semibold text-ink">
                      {submittedLead.tierName} ·{' '}
                      {submittedLead.accounts.toLocaleString()} accounts ·{' '}
                      {submittedLead.seats} seats
                    </dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 border-t border-border pt-3">
                    <dt className="font-medium text-ink">Estimated Rate</dt>
                    <dd className="font-bold text-brand-ink tabular-nums">
                      ${submittedLead.monthlyPrice.toLocaleString()}/mo (
                      {submittedLead.billing})
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-lg border border-border-strong bg-surface px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-subtle sm:w-auto"
                >
                  Adjust estimate or submit another inquiry
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-ink">
                  2. Lock in your quote &amp; start trial
                </h3>

                {/* Connected Estimate Pill */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-brand-soft/60 px-4 py-3 text-xs sm:text-sm">
                  <div className="min-w-0">
                    <span className="font-semibold text-brand-ink">
                      {estimate.tierName} Estimate
                    </span>
                    <span className="mx-1.5 text-ink-muted" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-ink-muted">
                      {estimate.accounts.toLocaleString()} accounts,{' '}
                      {estimate.seats} seats ({estimate.billing})
                    </span>
                  </div>
                  <span className="shrink-0 font-bold text-ink tabular-nums">
                    ${estimate.monthlyPrice.toLocaleString()}/mo
                  </span>
                </div>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-busy={isSubmitting}
                  className="mt-6 space-y-5"
                >
                  <fieldset disabled={isSubmitting} className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="lead-name"
                        className="block text-sm font-medium text-ink"
                      >
                        Full name <span className="text-danger" aria-hidden="true">*</span>
                      </label>
                      <input
                        ref={fullNameRef}
                        id="lead-name"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="Alex Rivera"
                        value={values.fullName}
                        onChange={(e) =>
                          handleFieldChange('fullName', e.target.value)
                        }
                        onBlur={() => handleFieldBlur('fullName')}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={
                          errors.fullName ? 'lead-name-error' : undefined
                        }
                        className={`mt-1.5 block w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 transition-colors disabled:bg-subtle disabled:opacity-70 ${
                          errors.fullName
                            ? 'border-danger focus:border-danger'
                            : 'border-border-strong focus:border-brand-ink'
                        }`}
                      />
                      {errors.fullName && (
                        <p
                          id="lead-name-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label
                        htmlFor="lead-email"
                        className="block text-sm font-medium text-ink"
                      >
                        Work email <span className="text-danger" aria-hidden="true">*</span>
                      </label>
                      <input
                        ref={emailRef}
                        id="lead-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="alex@company.com"
                        value={values.email}
                        onChange={(e) =>
                          handleFieldChange('email', e.target.value)
                        }
                        onBlur={() => handleFieldBlur('email')}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? 'lead-email-error' : undefined
                        }
                        className={`mt-1.5 block w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 transition-colors disabled:bg-subtle disabled:opacity-70 ${
                          errors.email
                            ? 'border-danger focus:border-danger'
                            : 'border-border-strong focus:border-brand-ink'
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="lead-email-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Company Name */}
                    <div>
                      <label
                        htmlFor="lead-company"
                        className="block text-sm font-medium text-ink"
                      >
                        Company name <span className="text-danger" aria-hidden="true">*</span>
                      </label>
                      <input
                        ref={companyRef}
                        id="lead-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        required
                        placeholder="Acme Software"
                        value={values.company}
                        onChange={(e) =>
                          handleFieldChange('company', e.target.value)
                        }
                        onBlur={() => handleFieldBlur('company')}
                        aria-invalid={Boolean(errors.company)}
                        aria-describedby={
                          errors.company ? 'lead-company-error' : undefined
                        }
                        className={`mt-1.5 block w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 transition-colors disabled:bg-subtle disabled:opacity-70 ${
                          errors.company
                            ? 'border-danger focus:border-danger'
                            : 'border-border-strong focus:border-brand-ink'
                        }`}
                      />
                      {errors.company && (
                        <p
                          id="lead-company-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.company}</span>
                        </p>
                      )}
                    </div>

                    {/* Primary Goal */}
                    <div>
                      <label
                        htmlFor="lead-goal"
                        className="block text-sm font-medium text-ink"
                      >
                        Primary goal <span className="text-danger" aria-hidden="true">*</span>
                      </label>
                      <select
                        ref={goalRef}
                        id="lead-goal"
                        name="goal"
                        required
                        value={values.goal}
                        onChange={(e) =>
                          handleFieldChange('goal', e.target.value)
                        }
                        onBlur={() => handleFieldBlur('goal')}
                        aria-invalid={Boolean(errors.goal)}
                        aria-describedby={
                          errors.goal ? 'lead-goal-error' : undefined
                        }
                        className={`mt-1.5 block w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-ink transition-colors disabled:bg-subtle disabled:opacity-70 ${
                          errors.goal
                            ? 'border-danger focus:border-danger'
                            : 'border-border-strong focus:border-brand-ink'
                        }`}
                      >
                        <option value="">Select your top priority...</option>
                        {PRIMARY_GOALS.map((goal) => (
                          <option key={goal} value={goal}>
                            {goal}
                          </option>
                        ))}
                      </select>
                      {errors.goal && (
                        <p
                          id="lead-goal-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.goal}</span>
                        </p>
                      )}
                    </div>
                  </fieldset>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-65"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2
                          className="h-4 w-4 animate-spin"
                          aria-hidden="true"
                        />
                        <span>Preparing your tailored quote...</span>
                      </>
                    ) : (
                      <span>
                        Lock in ${estimate.monthlyPrice.toLocaleString()}/mo quote
                      </span>
                    )}
                  </button>

                  <p className="text-center text-xs leading-relaxed text-ink-muted">
                    No credit card required. Your quote stays valid for 30 days
                    with zero obligation.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
