import { test, expect } from '@playwright/test';
import { SELECTORS } from '@fixtures/selectors';
import { CountryCodeEnum } from '@constants/shared';
import { Index } from '@pages/index';

/**
 * Navigation Smoke Tests
 */

test.describe('Gigabyte Navigation - Smoke Tests', () => {
  test('global site should not show promotion menu area in header', async ({ page }) => {
    const homepage = new Index(page);
    await homepage.gotoHomepage();

    const header = page.locator(SELECTORS.HEADER);
    const promotionArea = page.locator(SELECTORS.MENU_PROMOTION_AREA);

    // 等主要頁首出現後再做 DOM 存在性檢查，避免過早斷言
    await expect(header).toBeVisible();

    // 「不應該存在」最穩定的寫法：DOM 中不應存在該元素
    await expect(promotionArea).toHaveCount(0);
  });

  test('TW local site should show promotion menu area in header', async ({ page }) => {
    const homepage = new Index(page);
    await homepage.gotoHomepage(CountryCodeEnum.Taiwan);

    const header = page.locator(SELECTORS.HEADER);
    const promotionArea = page.locator(SELECTORS.MENU_PROMOTION_AREA);

    await expect(header).toBeVisible();
    await expect(promotionArea).not.toHaveCount(0);
    await expect(promotionArea.first()).toBeVisible();
  });
});