import { Page } from '@playwright/test';

export class Index {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * @description 導航到首頁
   */
  async gotoHomepage() {
    await this.page.goto('/');
  }
}