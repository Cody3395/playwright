# Gigabyte Playwright E2E

使用 Playwright 進行端到端測試，採 Page Object Model（POM）降低測試重複與維護成本。

## 專案結構

```
.
├── tests/
│   ├── smoke/               # 快速驗證
│   └── critical/            # 關鍵路徑
├── pages/                   # POM：Index/Header 等
├── fixtures/                # urls/selectors
├── constants/               # CountryCodeEnum 等
├── utils/
├── playwright.config.ts
├── tsconfig.json            # @pages/@fixtures/... path aliases
└── .env(.example)
```

## 安裝與設定

```bash
npm install
npx playwright install
cp .env.example .env
```

`.env`（必要）：

```env
BASE_URL=https://www.gigabyte.com/
ENVIRONMENT=production
```

註：`baseURL` 由 `playwright.config.ts` 的 `use.baseURL` 控制，測試中建議使用相對路徑（例如 `'/'`、`'/tw'`）。

## 常用指令

```bash
npm test            # 跑全部測試
npm run test:smoke  # 只跑 smoke（快速驗證）
npm run test:critical # 只跑 critical（關鍵路徑）
npm run test:ui     # UI 模式（互動式）
npm run test:debug  # 除錯模式（Inspector / pause）
npm run test:headed # 有頭模式（顯示瀏覽器）
npm run report      # 開啟/產生 HTML 報告
```

## 寫測試（POM + URL helper）

建議用 `beforeEach` 初始化 Page Object，避免誤用 `page` 在檔案最外層：

```ts
import { test, expect } from '@playwright/test';
import { Index } from '@pages/index';
import { Header } from '@pages/layout';
import { URLS } from '@fixtures/urls';
import { CountryCodeEnum } from '@constants/shared';

test.describe('Example', () => {
  let homepage: Index;
  let header: Header;

  test.beforeEach(async ({ page }) => {
    homepage = new Index(page);
    header = new Header(page);
  });

  test('open homepage', async ({ page }) => {
    // Global homepage
    await homepage.gotoHomepage();

    // Taiwan site homepage（需要測 TW 站時改用這行）
    // await page.goto(URLS.homePath(CountryCodeEnum.Taiwan)); // /tw

    await header.clickSearchButton();
    await expect(page).toHaveTitle(/GIGABYTE/);
  });
});
```

## 輸出與報告

- HTML Report：`playwright-report/`
- JSON 結果：`test-results/results.json`

## CI

GitLab Pipeline 由 `.gitlab-ci.yml` 管理（通常先跑 smoke，再跑 critical）。

---

最後更新：2026-03-13
