/**
 * 集中管理所有選擇器
 * 優先使用 data-testid，其次使用語義化選擇器
 */

export const SELECTORS = {
  // 通用元素
  SEARCH_BUTTON: 'img >> nth=4',
  SEARCH_BOX: 'textbox >> text=Hit me with your best keyword',
  SEARCH_INPUT: 'input[placeholder*="keyword"]',
  
  // 首頁
  HOME_TITLE: 'h1',
  HEADER: 'header',
  FOOTER: 'footer',
  
  // 產品相關
  PRODUCT_CARD: '[data-testid="product-card"]',
  PRODUCT_LINK: 'a[role="link"]',
  PRODUCT_IMAGE: 'img[alt*="product"]',
  
  // 導航
  NAVIGATION_MENU: 'nav',
  MENU_ITEM: '[data-testid="menu-item"]',
  MENU_PROMOTION_AREA: '.menu-promotion-area',
  
  // 搜尋結果
  SEARCH_RESULTS: '[data-testid="search-results"]',
  RESULT_ITEM: '[data-testid="result-item"]',
};

export default SELECTORS;
