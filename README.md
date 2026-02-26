# Gigabyte E2E 測試專案

本專案使用 **Playwright** 進行端到端測試，採用 **Page Object Model** 設計模式，確保測試的可維護性和可擴展性。

## 📁 專案結構

```
e2e/
├── tests/                    # 測試文件
│   ├── smoke/               # Smoke Tests（快速驗證）
│   │   ├── home.spec.ts
│   │   └── navigation.spec.ts
│   └── critical/            # Critical Tests（關鍵路徑）
│       ├── consumer-journey.spec.ts
│       └── support-journey.spec.ts
├── pages/                    # Page Object（核心模式）
│   └── GigabytePage.ts
├── fixtures/                 # 配置和常數集中管理
│   ├── urls.ts              # Base URL 和重要路徑
│   ├── selectors.ts         # 選擇器常數
│   └── locales.ts           # 多語言配置
├── utils/                    # 共用工具函式
│   ├── wait.ts              # 等待相關
│   └── network.ts           # API 監測
├── scripts/                  # 輔助腳本
│   └── ci-install-browsers.sh
├── playwright.config.ts      # Playwright 配置
├── package.json             # 依賴管理
├── .env.example             # 環境變數範例
└── .gitlab-ci.yml           # GitLab CI/CD 配置
```

## 🚀 快速開始

### 1. 安裝依賴

```bash
cd e2e
npm install
npx playwright install
```

### 2. 配置環境

複製 `.env.example` 為 `.env` 並設定相應的值：

```bash
cp .env.example .env
```

編輯 `.env` 文件：
```env
BASE_URL=https://www.gigabyte.com/
ENVIRONMENT=production
```

### 3. 執行測試

#### 執行所有測試
```bash
npm test
```

#### 執行 Smoke Tests（快速驗證）
```bash
npm run test:smoke
```

#### 執行 Critical Tests（關鍵路徑）
```bash
npm run test:critical
```

#### 調試模式
```bash
npm run test:debug
```

#### UI 模式（互動式）
```bash
npm run test:ui
```

#### 有頭模式（看得到瀏覽器）
```bash
npm run test:headed
```

### 4. 查看報告

測試完成後，查看 HTML 報告：

```bash
npm run report
```

## 🏗️ 設計模式

### Page Object Model (POM)

所有頁面交互都通過 `pages/` 目錄下的類進行：

```typescript
// pages/GigabytePage.ts
export class GigabytePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async searchProduct(keyword: string) {
    // 實現搜尋邏輯
  }
}
```

在測試中使用：
```typescript
test('search product', async ({ page }) => {
  const gigabytePage = new GigabytePage(page);
  await gigabytePage.goto();
  await gigabytePage.searchProduct('gaming');
});
```

**優點：**
- ✅ 減少重複代碼
- ✅ 提高可維護性
- ✅ 易於擴展

## 🔧 配置管理

### URLs (`fixtures/urls.ts`)

集中管理所有 URL 常數：

```typescript
import { URLS } from '../fixtures/urls';

// 使用
await page.goto(URLS.HOME);
```

### Selectors (`fixtures/selectors.ts`)

集中管理所有選擇器：

```typescript
import { SELECTORS } from '../fixtures/selectors';

// 優先使用 data-testid
await page.locator(SELECTORS.SEARCH_BOX).fill('keyword');
```

### 多語言支援 (`fixtures/locales.ts`)

支援多個語言/地區設定。

## 📊 測試分類

### Smoke Tests（快速驗證，< 5 分鐘）

驗證關鍵功能是否可用，在 CI/CD 中首先執行：

- `tests/smoke/home.spec.ts` - 首頁加載驗證
- `tests/smoke/navigation.spec.ts` - 導航功能驗證

### Critical Tests（關鍵路徑，< 15 分鐘）

驗證完整的使用者旅程，允許失敗重試：

- `tests/critical/consumer-journey.spec.ts` - 購買者旅程
- `tests/critical/support-journey.spec.ts` - 支援流程

## 🔍 最佳實踐

### 1. 使用 Page Object Model

❌ **避免：** 在測試中直接寫選擇器
```typescript
// 不好的做法
await page.click('button.search');
await page.fill('input[name=q]', 'test');
```

✅ **推薦：** 使用 Page Object
```typescript
const page = new GigabytePage(page);
await page.clickSearchButton();
await page.searchProduct('test');
```

### 2. 使用自動等待，避免硬等待

❌ **避免：**
```typescript
await page.waitForTimeout(1000);
```

✅ **推薦：**
```typescript
await page.locator('[data-testid="result"]').waitFor({ state: 'visible' });
```

### 3. 集中管理配置

使用 `fixtures/` 目錄集中管理：
- URLs（`urls.ts`）
- 選擇器（`selectors.ts`）
- 測試資料（如果需要）

### 4. 使用語義化選擇器

優先順序：
1. `getByRole()` - 最推薦
2. `getByLabel()` - 表單標籤
3. `data-testid` - 測試專用
4. CSS 選擇器 - 最後手段

```typescript
// 好的做法
await page.getByRole('button', { name: 'Search' }).click();
await page.getByLabel('Username').fill('user');
```

## 🚦 CI/CD 集成

`.gitlab-ci.yml` 配置了自動化 Pipeline：

1. **Install** - 安裝依賴和瀏覽器
2. **Smoke** - 執行快速驗證（必須通過）
3. **Critical** - 執行關鍵路徑（允許重試）

```yaml
# 在 GitLab 上自動執行
# - Smoke 測試必須通過（fail fast）
# - Critical 測試允許重試 2 次
# - 生成 JUnit 報告用於 GitLab 集成
```

### 本地模擬 CI 環境

```bash
# 設定 CI=true
export CI=true
npm test
```

## 📝 編寫新測試

### 佈局

```typescript
import { test, expect } from '@playwright/test';
import { GigabytePage } from '../../pages/GigabytePage';

test.describe('功能名稱', () => {
  test('應該做某事', async ({ page }) => {
    // Arrange - 準備
    const gigabytePage = new GigabytePage(page);
    
    // Act - 執行
    await gigabytePage.goto();
    await gigabytePage.doSomething();
    
    // Assert - 驗證
    await expect(page.locator('[data-testid="result"]')).toBeVisible();
  });
});
```

### 命名約定

- 文件名：`{feature}.spec.ts`
- 測試名稱：描述性、清晰、可操作

```typescript
// ✅ 好的命名
test('should display search results when user searches for product')

// ❌ 不好的命名
test('test 1')
test('search works')
```

## 🐛 調試

### 方法 1：Playwright Inspector

```bash
npm run test:debug
```

在代碼中使用 breakpoint：
```typescript
await page.pause(); // 會暫停在此處
```

### 方法 2：UI Mode

```bash
npm run test:ui
```

互動式查看測試執行過程。

### 方法 3：Trace Viewer

查看失敗測試的詳細錄像和網路請求：

```bash
npx playwright show-trace test-results/trace.zip
```

## 📚 資源

- [Playwright 官方文件](https://playwright.dev/)
- [Good Practices](https://playwright.dev/docs/best-practices)
- [Debugging Tests](https://playwright.dev/docs/debug)

## 🤝 貢獻指南

1. 新功能應對應新的 Page Object
2. 遵循現有的命名約定
3. 使用語義化選擇器
4. 為臨界路徑添加測試

## 📄 許可

ISC

---

**最後更新：** 2026 年 2 月 24 日
