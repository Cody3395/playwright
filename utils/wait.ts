/**
 * 等待相關的共用工具函式
 * 
 * 注意：這些是封裝好的常用等待操作，應該謹慎使用。
 * 優先使用 Playwright 內建的自動等待機制。
 */

import { Page } from '@playwright/test';

/**
 * 等待特定元素可見
 * @param page - Page 對象
 * @param selector - 元素選擇器
 * @param timeout - 超時時間（毫秒）
 */
export async function waitForElementVisible(
  page: Page,
  selector: string,
  timeout: number = 5000
): Promise<void> {
  await page.locator(selector).waitFor({ state: 'visible', timeout });
}

/**
 * 等待元素消失
 * @param page - Page 對象
 * @param selector - 元素選擇器
 * @param timeout - 超時時間（毫秒）
 */
export async function waitForElementHidden(
  page: Page,
  selector: string,
  timeout: number = 5000
): Promise<void> {
  await page.locator(selector).waitFor({ state: 'hidden', timeout });
}

/**
 * 等待加載組件消失
 * @param page - Page 對象
 * @param timeout - 超時時間（毫秒）
 */
export async function waitForLoadingComplete(
  page: Page,
  timeout: number = 10000
): Promise<void> {
  await waitForElementHidden(page, '[data-testid="loading"], .spinner, .loader', timeout);
}

/**
 * 等待 API 請求完成
 * @param page - Page 對象
 * @param urlPattern - URL 匹配模式
 * @param timeout - 超時時間（毫秒）
 */
export async function waitForNetworkIdle(
  page: Page,
  timeout: number = 5000
): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}

export default {
  waitForElementVisible,
  waitForElementHidden,
  waitForLoadingComplete,
  waitForNetworkIdle,
};
