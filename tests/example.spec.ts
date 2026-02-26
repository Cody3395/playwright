import { test, expect } from '@playwright/test';
import { GigabytePage } from '../pages/GigabytePage';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/GIGABYTE/);
});

test('page loads successfully', async ({ page }) => {
  await page.goto('/');

  // Verify page loaded by checking for common elements
  const pageTitle = await page.title();
  expect(pageTitle.length).toBeGreaterThan(0);
});

test('search product on homepage', async ({ page }) => {
  const gigabytePage = new GigabytePage(page);
  
  await gigabytePage.goto();
  await gigabytePage.clickSearchButton();
  await gigabytePage.searchProduct('gaming');
  const productPage = await gigabytePage.clickProductResult('Product GIGABYTE GAMING A16');
  
  // 驗證新頁面已打開
  expect(productPage).toBeDefined();
});