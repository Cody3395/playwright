import { Page } from '@playwright/test';

export class GigabytePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * 導航到首頁
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * 點擊搜尋按鈕
   */
  async clickSearchButton() {
    await this.page.getByRole('img').nth(4).click();
  }

  /**
   * 在搜尋框輸入關鍵字
   */
  async searchProduct(keyword: string) {
    const searchBox = this.page.getByRole('textbox', { name: 'Hit me with your best keyword' });
    await searchBox.click();
    await searchBox.fill(keyword);
    await searchBox.press('Enter');
  }

  /**
   * 點擊搜尋結果中的產品
   */
  async clickProductResult(productName: string) {
    const productPromise = this.page.waitForEvent('popup');
    await this.page.getByRole('link', { name: productName }).click();
    return await productPromise;
  }
}
