import { test, expect } from '@playwright/test';
import { MeridianPage } from './pages/MeridianPage.js';

test.describe('Meridian Landing Page Smoke Suite', () => {
  test('Page Load & Hero Asset', async ({ page }) => {
    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (error) => {
      pageErrors.push(error.message);
    });

    const meridian = new MeridianPage(page);
    await meridian.goto();

    await expect(page).toHaveTitle(/Meridian — B2B Product & Revenue Analytics/);
    await expect(meridian.heroHeading).toBeVisible();
    await expect(meridian.heroImage).toBeVisible();

    const imageMetrics = await meridian.heroImage.evaluate((img) => ({
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }));

    expect(imageMetrics.complete).toBe(true);
    expect(imageMetrics.naturalWidth).toBeGreaterThan(0);
    expect(imageMetrics.naturalHeight).toBeGreaterThan(0);
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('Interactive Calculator Dynamics', async ({ page }) => {
    const meridian = new MeridianPage(page);
    await meridian.goto();

    // Default state: 10,000 accounts, 10 seats, Annual -> $474/mo (Scale)
    await expect(meridian.accountsOutput).toHaveText('10,000 accounts');
    await expect(meridian.estimatorSummary).toContainText('Recommended: Scale');
    await expect(meridian.estimatorSummary).toContainText('$474');
    await expect(meridian.submitButton).toContainText('Lock in $474/mo quote');

    // Toggle to Monthly billing -> $592/mo
    await meridian.selectBilling('monthly');
    await expect(meridian.monthlyBillingRadio).toHaveAttribute('aria-checked', 'true');
    await expect(meridian.estimatorSummary).toContainText('$592');
    await expect(meridian.submitButton).toContainText('Lock in $592/mo quote');

    // Toggle back to Annual billing -> $474/mo
    await meridian.selectBilling('annual');
    await expect(meridian.annualBillingRadio).toHaveAttribute('aria-checked', 'true');
    await expect(meridian.submitButton).toContainText('Lock in $474/mo quote');

    // Test minimum boundary on team seats (5 min) + minimum accounts (1,000 -> Growth)
    await meridian.setTrackedAccounts(1000);
    await expect(meridian.accountsOutput).toHaveText('1,000 accounts');
    await meridian.setTeamSeats(6);
    await meridian.decreaseSeatsButton.click();
    await expect(meridian.seatsInput).toHaveValue('5');
    await expect(meridian.decreaseSeatsButton).toBeDisabled();
    await expect(meridian.estimatorSummary).toContainText('Recommended: Growth');
    await expect(meridian.estimatorSummary).toContainText('$152');
    await expect(meridian.submitButton).toContainText('Lock in $152/mo quote');

    // Test maximum boundary on team seats (50 max) + maximum accounts (50,000 -> Enterprise)
    await meridian.setTrackedAccounts(50000);
    await expect(meridian.accountsOutput).toHaveText('50,000 accounts');
    await meridian.setTeamSeats(49);
    await meridian.increaseSeatsButton.click();
    await expect(meridian.seatsInput).toHaveValue('50');
    await expect(meridian.increaseSeatsButton).toBeDisabled();
    await expect(meridian.estimatorSummary).toContainText('Recommended: Enterprise');
    await expect(meridian.estimatorSummary).toContainText('$1,738');
    await expect(meridian.submitButton).toContainText('Lock in $1,738/mo quote');
  });

  test('Lead Form Validation & Submission', async ({ page }) => {
    const meridian = new MeridianPage(page);
    await meridian.goto();

    // 1. Empty submit triggers inline validation errors
    await meridian.submitLeadForm();
    await expect(meridian.allFormErrors).toHaveCount(4);
    await expect(meridian.fullNameError).toContainText('Please enter your full name.');
    await expect(meridian.emailError).toContainText('Please enter your work email address.');
    await expect(meridian.companyError).toContainText('Please enter your company name.');
    await expect(meridian.goalError).toContainText('Please choose your primary analytics goal.');
    await expect(meridian.fullNameInput).toBeFocused();

    // 2. Invalid email ("test@abc") is rejected
    await meridian.fillLeadForm({
      fullName: 'Jordan Taylor',
      email: 'test@abc',
      company: 'Northwind Labs',
      goal: 'Identify expansion-ready accounts',
    });
    await meridian.submitLeadForm();
    await expect(meridian.emailError).toBeVisible();
    await expect(meridian.emailError).toContainText('Enter a valid email address');
    await expect(meridian.confirmationRegion).toHaveCount(0);

    // 3. Valid inputs enter disabled loading state and reach confirmation state
    await meridian.fillLeadForm({ email: 'jordan@northwind.io' });
    await meridian.submitLeadForm();

    await expect(meridian.submitButton).toBeDisabled();
    await expect(meridian.submitButton).toContainText('Preparing your tailored quote...');

    await expect(meridian.confirmationRegion).toBeVisible();
    await expect(meridian.confirmationRegion).toContainText(
      'Your estimate is locked in, Jordan Taylor.'
    );
    await expect(meridian.confirmationRegion).toContainText('jordan@northwind.io');
    await expect(meridian.confirmationRegion).toContainText('Northwind Labs');
    await expect(meridian.confirmationRegion).toContainText(/MRD-\d{4}/);
  });

  test('Responsive Viewport Check (1440x900 & 375x812)', async ({ page }) => {
    const meridian = new MeridianPage(page);

    // Desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await meridian.goto();
    await expect(meridian.heroHeading).toBeVisible();
    const desktopMetrics = await meridian.getHorizontalOverflowMetrics();
    expect(desktopMetrics.scrollWidth).toBeLessThanOrEqual(desktopMetrics.innerWidth);

    // Mobile viewport (375px)
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(100);
    const mobileMetrics = await meridian.getHorizontalOverflowMetrics();
    expect(mobileMetrics.scrollWidth).toBeLessThanOrEqual(mobileMetrics.innerWidth);
  });
});
