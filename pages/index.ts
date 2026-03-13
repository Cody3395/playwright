import { Page } from '@playwright/test';
import { URLS, type CountryCode } from '@fixtures/urls';

export class Index {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * @description 導航到首頁
   */
  async gotoHomepage(country?: CountryCode) {
    await this.page.goto(URLS.homePath(country));
  }
}