export class MeridianPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Hero
    this.heroHeading = page.getByRole('heading', {
      level: 1,
      name: /Turn product usage into predictable revenue/i,
    });
    this.heroImage = page.locator('img[src="/hero-meridian.webp"]');

    // Interactive Quote Estimator controls
    this.accountsSlider = page.locator('#tracked-accounts');
    this.accountsOutput = page.locator('output[for="tracked-accounts"]');
    this.seatsInput = page.locator('#workspace-seats');
    this.decreaseSeatsButton = page.getByRole('button', {
      name: 'Decrease team seats',
    });
    this.increaseSeatsButton = page.getByRole('button', {
      name: 'Increase team seats',
    });
    this.monthlyBillingRadio = page.getByRole('radio', { name: /^Monthly$/i });
    this.annualBillingRadio = page.getByRole('radio', { name: /Annual/i });
    this.estimatorSummary = page.locator('#estimator [aria-live="polite"]').first();

    // Lead Capture Form controls
    this.fullNameInput = page.locator('#lead-name');
    this.emailInput = page.locator('#lead-email');
    this.companyInput = page.locator('#lead-company');
    this.goalSelect = page.locator('#lead-goal');
    this.submitButton = page.locator('#estimator form button[type="submit"]');

    // Validation & Confirmation states
    this.fullNameError = page.locator('#lead-name-error');
    this.emailError = page.locator('#lead-email-error');
    this.companyError = page.locator('#lead-company-error');
    this.goalError = page.locator('#lead-goal-error');
    this.allFormErrors = page.locator('#estimator form [role="alert"]');
    this.confirmationRegion = page.locator('#estimator [role="status"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  /**
   * Sets the range slider value reliably and triggers React's change event.
   * @param {number} accounts
   */
  async setTrackedAccounts(accounts) {
    await this.accountsSlider.fill(String(accounts));
  }

  /**
   * Sets the team seats input directly and blurs to trigger clamping.
   * @param {number} seats
   */
  async setTeamSeats(seats) {
    await this.seatsInput.fill(String(seats));
    await this.seatsInput.blur();
  }

  async selectBilling(cycle) {
    if (cycle === 'monthly') {
      await this.monthlyBillingRadio.click();
    } else {
      await this.annualBillingRadio.click();
    }
  }

  /**
   * Fills the lead capture form fields.
   * @param {{ fullName?: string, email?: string, company?: string, goal?: string }} data
   */
  async fillLeadForm({ fullName, email, company, goal }) {
    if (fullName !== undefined) await this.fullNameInput.fill(fullName);
    if (email !== undefined) await this.emailInput.fill(email);
    if (company !== undefined) await this.companyInput.fill(company);
    if (goal !== undefined) await this.goalSelect.selectOption(goal);
  }

  async submitLeadForm() {
    await this.submitButton.click();
  }

  /**
   * Checks whether the page has zero horizontal overflow at the current viewport.
   */
  async getHorizontalOverflowMetrics() {
    return this.page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
  }
}
