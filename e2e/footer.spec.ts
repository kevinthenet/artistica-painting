import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  const availablePages = ['/', '/about', '/contact', '/privacy', '/404'];
  const randomIndex = Math.floor(Math.random() * availablePages.length);
  // intentionally go to any page to verify this works in all pages
  await page.goto(availablePages[randomIndex]);
});

test('should have a logo', async ({ page }) => {
  const footer = page.locator('footer');

  await expect(footer.getByAltText('Artistica Painting Logo')).toBeVisible();
});

test('should have some description text', async ({ page }) => {
  const footer = page.locator('footer');

  await expect(
    footer.getByRole('paragraph').filter({ hasText: 'one brushstroke at a time' })
  ).toBeVisible();
});

const socialLinks = ['Facebook'];
for (const link of socialLinks) {
  test(`should have an external link to: ${link}`, async ({ page }) => {
    const footer = page.locator('footer');

    const socialLink = footer.getByRole('link', { name: link });
    await expect(socialLink).toBeVisible();

    const newTabPromise = page.waitForEvent('popup');
    await socialLink.click();
    const newTab = await newTabPromise;

    await newTab.waitForLoadState();
    await expect(newTab).not.toHaveURL(/artisticapainting\.com/);
  });
}

const internalLinks = ['Home', 'About', 'Contact', 'Privacy'];
for (const link of internalLinks) {
  test(`should have an internal company link: ${link}`, async ({ page }) => {
    const footer = page.locator('footer');

    const internalLink = footer.getByRole('link', { name: link });
    await expect(internalLink).toBeVisible();

    await internalLink.click();
    await expect(page).toHaveURL(/artisticapainting\.com/);
  });
}
