/**
 * 集中管理所有測試 URL 和基礎路徑
 */

import { CountryCodeEnum } from '../constants/shared';

export type CountryCode = CountryCodeEnum | string;

export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  PRODUCTS: '/products',
} as const;

export type RouteKey = keyof typeof ROUTES;

function normalizePath(input: string): string {
  const trimmed = (input ?? '').trim();
  if (!trimmed) return '/';

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  if (withLeadingSlash.length > 1 && withLeadingSlash.endsWith('/')) {
    return withLeadingSlash.slice(0, -1);
  }
  return withLeadingSlash;
}

/**
 *@description 將 route path 加上國家/語系前綴。
 * - `withCountry('/', 'tw')` -> `/tw`
 * - `withCountry('/products', 'tw')` -> `/tw/products`
 * - `withCountry('/tw/products', 'tw')` -> `/tw/products`（避免重複前綴）
 */
export function withCountry(path: string, country?: CountryCode): string {
  const cleanPath = normalizePath(path);
  const code = (country ?? '').toString().trim();

  if (!code || code.toLowerCase() === CountryCodeEnum.Global) {
    return cleanPath;
  }

  const prefix = normalizePath(code);

  if (cleanPath === prefix || cleanPath.startsWith(`${prefix}/`)) {
    return cleanPath;
  }

  if (cleanPath === '/') {
    return prefix;
  }

  return `${prefix}${cleanPath}`;
}

export function routePath(route: RouteKey, country?: CountryCode): string {
  return withCountry(ROUTES[route], country);
}

export const URLS = {
  BASE_URL: process.env.BASE_URL || 'https://www.gigabyte.com/',
  
  // 重要路徑
  HOME: ROUTES.HOME,
  SEARCH: ROUTES.SEARCH,
  PRODUCTS: ROUTES.PRODUCTS,

  // 建議用法：使用 CountryCodeEnum 產生路徑，避免為每個國家都新增常數
  routePath,
  homePath: (country?: CountryCode) => routePath('HOME', country),
  
  // 環境特定配置
  ENVIRONMENTS: {
    DEVELOPMENT: 'http://localhost:3000',
    STAGING: 'https://staging.gigabyte.com/',
    PRODUCTION: 'https://www.gigabyte.com/',
  },
  ROUTES,
};

/**
 *@description 根據環境獲取基礎 URL
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
