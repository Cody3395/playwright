import { test, expect } from '@playwright/test';
import { GigabytePage } from '../../pages/GigabytePage';
import { URLS } from '../../fixtures/urls';

/**
 * Smoke Tests - 快速驗證關鍵功能
 */

test.describe('Gigabyte Homepage - Smoke Tests', () => {
  test('should load homepage and verify title', async ({ page }) => {
    await page.goto(URLS.HOME);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/GIGABYTE/);
  });

  test('should load page successfully with content', async ({ page }) => {
    await page.goto(URLS.HOME);

    // Verify page loaded by checking for common elements
    const pageTitle = await page.title();
    expect(pageTitle.length).toBeGreaterThan(0);
  });

  test('should be able to search product from homepage', async ({ page }) => {
    const gigabytePage = new GigabytePage(page);

    await gigabytePage.goto();
    await gigabytePage.clickSearchButton();
    await gigabytePage.searchProduct('gaming');
    const productPage = await gigabytePage.clickProductResult('Product GIGABYTE GAMING A16');

    // 驗證新頁面已打開
    expect(productPage).toBeDefined();
  });
});
