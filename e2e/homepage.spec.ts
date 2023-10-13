import AxeBuilder from '@axe-core/playwright';

import { expect, test } from './base-test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.skip('should not have any automatically detectable accessibility issues', async ({ page }) => {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);

  // test dark mode for accessibility violations as well
  await page.getByRole('button').filter({ hasText: 'Toggle theme mode' }).click();

  const darkModeAccessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(darkModeAccessibilityScanResults.violations).toEqual([]);
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle('Artistica Painting');
});

test('has "Learn More" and "Get an Estimate" buttons which lead to the about and contact page, respectively', async ({
  page,
}) => {
  const aboutButton = page.getByRole('link', { name: 'About us' });
  await expect(aboutButton).toBeVisible();
  await aboutButton.click();
  expect(page.url()).toContain('about');
  await expect(page).toHaveTitle(/About/);

  // reset
  page.goto('/');

  const contactButton = page.getByRole('link', { name: 'Get in touch' });
  await expect(contactButton).toBeVisible();
  await contactButton.click();
  expect(page.url()).toContain('contact');
  await expect(page).toHaveTitle(/Contact/);
});

test('has a services section with collapsed category lists', async ({ page }) => {
  const servicesSection = page.locator('section').filter({ hasText: 'Interior Services' });

  await expect(servicesSection).toBeVisible();

  const serviceSectionToggle = servicesSection
    .getByRole('button')
    .filter({ hasText: 'Interior Services' });

  await expect(serviceSectionToggle).toBeVisible();

  const service = servicesSection.getByRole('listitem').filter({ hasText: 'Interior Painting' });

  await expect(service).toBeHidden();

  await serviceSectionToggle.click();

  await expect(service).toBeVisible();
});

test('has an about us section with a "Read More" button that leads to the about page', async ({
  page,
}) => {
  await expect(page.getByRole('heading', { level: 2, name: 'About Us' })).toBeVisible();

  const btn = page.getByRole('link', { name: 'Read More' });
  await expect(btn).toBeVisible();
  await btn.click();
  expect(page.url()).toContain('about');
  await expect(page).toHaveTitle(/About/);
});

test('has a CTA with a button that leads to the contact page', async ({ page }) => {
  await expect(
    page.getByRole('heading', { level: 2, name: 'Primed and Ready to Paint?' })
  ).toBeVisible();

  const btn = page.getByRole('link', { name: 'Get a quote' });
  await expect(btn).toBeVisible();
  await btn.click();
  expect(page.url()).toContain('contact');
  await expect(page).toHaveTitle(/Contact/);
});
