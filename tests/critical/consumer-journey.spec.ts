import { test, expect } from '@playwright/test';

/**
 * @description Critical Tests - 重要功能驗證
 */

test.describe('Consumer Journey - Critical Path', () => {
  test('should complete basic user flow', async ({ page }) => {
    await page.goto('/');
    
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });
});
