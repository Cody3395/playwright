import { test, expect } from '@playwright/test';
import { URLS } from '../../fixtures/urls';
import { SELECTORS } from '../../fixtures/selectors';

/**
 * Navigation Smoke Tests
 */

test.describe('Gigabyte Navigation - Smoke Tests', () => {
  test('global site should not show promotion menu area in header', async ({ page }) => {
    await page.goto(URLS.HOME);

    // 等主要頁首出現後再做 DOM 存在性檢查，避免過早斷言
    await expect(page.locator(SELECTORS.HEADER)).toBeVisible();

    // 「不應該存在」最穩定的寫法：DOM 中不應存在該元素
    await expect(page.locator(SELECTORS.MENU_PROMOTION_AREA)).toHaveCount(0);
  });

  test('TW local site should show promotion menu area in header', async ({ page }) => {
    await page.goto(URLS.HOME);

    await expect(page.locator(SELECTORS.HEADER)).toBeVisible();

    const promotionArea = page.locator(SELECTORS.MENU_PROMOTION_AREA);
    await expect(promotionArea).not.toHaveCount(0);
    await expect(promotionArea.first()).toBeVisible();
  });
});