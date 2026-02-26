/**
 * 集中管理所有測試 URL 和基礎路徑
 */

export const URLS = {
  BASE_URL: process.env.BASE_URL || 'https://www.gigabyte.com/',
  
  // 重要路徑
  HOME: '/',
  SEARCH: '/search',
  PRODUCTS: '/products',
  
  // 環境特定配置
  ENVIRONMENTS: {
    DEVELOPMENT: 'http://localhost:3000',
    STAGING: 'https://staging.gigabyte.com/',
    PRODUCTION: 'https://www.gigabyte.com/',
  },
};

/**
 * 根據環境獲取基礎 URL
 */
export function getBaseUrl(env?: string): string {
  const environment = env || process.env.ENVIRONMENT || 'production';
  
  switch (environment.toLowerCase()) {
    case 'development':
    case 'dev':
      return URLS.ENVIRONMENTS.DEVELOPMENT;
    case 'staging':
      return URLS.ENVIRONMENTS.STAGING;
    case 'production':
    case 'prod':
    default:
      return URLS.ENVIRONMENTS.PRODUCTION;
  }
}
