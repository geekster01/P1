import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';
import { BrandMark } from './Navbar';

export function FaqFooter() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const count = FAQ_ITEMS.length;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      buttonRefs.current[(index + 1) % count]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      buttonRefs.current[(index - 1 + count) % count]?.focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      buttonRefs.current[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      buttonRefs.current[count - 1]?.focus();
    }
  };

  return (
    <>
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="scroll-mt-20 bg-canvas py-16 sm:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-left sm:text-center">
            <p className="text-xs font-semibold tracking-wider text-brand-ink uppercase">
              Questions &amp; answers
            </p>
            <h2
              id="faq-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              Frequently asked questions
            </h2>
            <p className="mt-3 text-base text-ink-muted">
              Everything you need to know about onboarding, security, and
              flexible pricing.
            </p>
          </div>

          <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-surface shadow-xs">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openId === item.id;
              const panelId = `${item.id}-panel`;
              const headerId = `${item.id}-header`;

              return (
                <div key={item.id} className="px-5 sm:px-6">
                  <h3>
                    <button
                      ref={(el) => {
                        buttonRefs.current[index] = el;
                      }}
                      id={headerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-ink transition-colors hover:text-brand-ink sm:text-base"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-brand-ink' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-sm leading-relaxed text-ink-muted sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 rounded-md text-ink"
              aria-label="Meridian back to top"
            >
              <BrandMark />
              <span className="text-base font-semibold tracking-tight">
                Meridian
              </span>
            </a>
            <p className="text-xs text-ink-muted">
              Predictable revenue analytics for modern B2B SaaS teams.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-muted"
          >
            <a
              href="#features"
              className="rounded-md transition-colors hover:text-ink"
            >
              Outcomes
            </a>
            <a
              href="#estimator"
              className="rounded-md transition-colors hover:text-ink"
            >
              Quote Estimator
            </a>
            <a
              href="#faq"
              className="rounded-md transition-colors hover:text-ink"
            >
              FAQ
            </a>
            <span className="text-xs text-ink-muted/80">
              &copy; {new Date().getFullYear()} Meridian Analytics, Inc.
            </span>
          </nav>
        </div>
      </footer>
    </>
  );
}
