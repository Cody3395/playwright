import { test, expect } from '@playwright/test';
import { Header } from '@pages/layout';
import { Index } from '@pages/index';
import { URLS } from '@fixtures/urls';

/**
 * @description Smoke Tests - 快速驗證關鍵功能
 */
test.describe('Gigabyte Homepage - Smoke Tests', () => {
  let homepage: Index;
  let header: Header;

  test.beforeEach(async ({ page }) => {
    homepage = new Index(page);
    header = new Header(page);
  });

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

  test('should be able to search product from homepage', async () => {
    await homepage.gotoHomepage();
    await header.clickSearchButton();
    await header.searchProduct('gaming');
    const productPage = await header.clickProductResult('Product GIGABYTE GAMING A16');

    // 驗證新頁面已打開
    expect(productPage).toBeDefined();
  });
});
