/**
 * 網路監測和 API 相關工具
 */

import { Page, Response } from '@playwright/test';

/**
 * 監聽 API 請求
 * @param page - Page 對象
 * @param urlPattern - URL 匹配模式
 * @param callback - 回調函式
 */
export async function onApiRequest(
  page: Page,
  urlPattern: string | RegExp,
  callback: (url: string, method: string) => void
): Promise<void> {
  page.on('request', (request) => {
    if (typeof urlPattern === 'string') {
      if (request.url().includes(urlPattern)) {
        callback(request.url(), request.method());
      }
    } else if (urlPattern.test(request.url())) {
      callback(request.url(), request.method());
    }
  });
}

/**
 * 攔截 API 響應
 * @param page - Page 對象
 * @param urlPattern - URL 匹配模式
 * @param callback - 回調函式
 */
export async function onApiResponse(
  page: Page,
  urlPattern: string | RegExp,
  callback: (url: string, status: number) => void
): Promise<void> {
  page.on('response', (response) => {
    if (typeof urlPattern === 'string') {
      if (response.url().includes(urlPattern)) {
        callback(response.url(), response.status());
      }
    } else if (urlPattern.test(response.url())) {
      callback(response.url(), response.status());
    }
  });
}

/**
 * 等待特定 API 響應
 * @param page - Page 對象
 * @param urlPattern - URL 匹配模式
 * @param timeout - 超時時間（毫秒）
 */
export async function waitForApiResponse(
  page: Page,
  urlPattern: string | RegExp,
  timeout: number = 5000
): Promise<Response> {
  return await page.waitForResponse(
    (response) => {
      if (typeof urlPattern === 'string') {
        return response.url().includes(urlPattern);
      }
      return urlPattern.test(response.url());
    },
    { timeout }
  );
}

/**
 * 錄製所有網路流量
 * @param page - Page 對象
 */
export function recordNetworkTraffic(page: Page): object[] {
  const traffic: object[] = [];

  page.on('request', (request) => {
    traffic.push({
      type: 'request',
      url: request.url(),
      method: request.method(),
      timestamp: new Date().toISOString(),
    });
  });

  page.on('response', (response) => {
    traffic.push({
      type: 'response',
      url: response.url(),
      status: response.status(),
      timestamp: new Date().toISOString(),
    });
  });

  return traffic;
}

export default {
  onApiRequest,
  onApiResponse,
  waitForApiResponse,
  recordNetworkTraffic,
};
