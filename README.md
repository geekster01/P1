# Meridian — High-Converting B2B Revenue & Product Analytics Landing Page

> **Live Demo URL:** _Coming soon (add deployed Vercel / Netlify URL)_  
> **Lighthouse Scores:** Performance `TBD` · Accessibility `TBD` · Best Practices `TBD` · SEO `TBD`

A modern, mobile-first, accessible B2B SaaS landing page for **Meridian**, built with React, Vite, TypeScript, and Tailwind CSS v4, and verified end-to-end with Playwright smoke tests using the Page Object Model.

## Key Conversion Features

- **6-Section High-Converting Architecture**
  1. **Sticky Minimal Navbar** — Brand mark, concise anchor navigation, keyboard skip link, and a single primary CTA button.
  2. **Above-the-Fold Hero** — Deep slate-navy aesthetic with indigo/emerald accents, outcome-driven copy, trust signals, and preloaded uncropped 3D hero artwork (`hero-meridian.webp`).
  3. **Metric / Trust Strip** — Semantic `<dl>` strip showcasing 3 measurable customer outcomes.
  4. **3-Column Outcome Feature Bento Grid** — Responsive bento layout focused on expansion signals, early churn detection, zero-SQL cohorts, and real-time CRM sync.
  5. **Real-Time Interactive Quote Estimator + Connected Lead Capture** — 3-input workspace configurator (tracked accounts slider `1,000–50,000`, team seats stepper `5–50`, Monthly/Annual `-20%` radiogroup) synced live to a client-side validated lead capture form with inline `role="alert"` errors, double-submission prevention (`disabled` loading state + synchronous lock), and a focusable confirmation state with reference ID.
  6. **Expandable 4-Item FAQ Accordion & Clean Footer** — Full keyboard navigation (`Enter`/`Space`, `ArrowUp`/`ArrowDown`, `Home`/`End`) and smooth CSS grid-row transitions respecting `prefers-reduced-motion`.
- **Responsive Down to 375px** — Mobile-first layout verified with zero horizontal overflow (`scrollWidth <= innerWidth`) across desktop (`1440×900`) and mobile (`375×812`) viewports.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 6
- **Styling:** Tailwind CSS v4, Lucide React icons
- **E2E Testing:** Playwright (`@playwright/test`) with Page Object Model (`tests/pages/MeridianPage.js`)

## Getting Started

```bash
# Install dependencies
npm install

# Start the local development server (http://localhost:5173)
npm run dev

# Typecheck and create a production build in dist/
npm run build

# Run the headless Playwright E2E smoke test suite
npx playwright test
```
