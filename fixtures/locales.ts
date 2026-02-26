/**
 * 多語言和多站台設定（可選）
 */

export const LOCALES = {
  // 支援的語系
  SUPPORTED_LANGUAGES: ['en', 'zh-tw', 'zh-cn', 'ja', 'ko'],
  
  // 語言到站台的映射
  LANGUAGE_TO_URL: {
    'en': 'https://www.gigabyte.com/en',
    'zh-tw': 'https://www.gigabyte.com/tw',
    'zh-cn': 'https://www.gigabyte.com.cn',
    'ja': 'https://www.gigabyte.com/jp',
    'ko': 'https://www.gigabyte.com/kr',
  },
  
  // 預設語言
  DEFAULT_LANGUAGE: 'en',
  
  // 語言特定的文本
  TEXT: {
    'en': {
      SEARCH_PLACEHOLDER: 'Hit me with your best keyword',
      NO_RESULTS: 'No results found',
    },
    'zh-tw': {
      SEARCH_PLACEHOLDER: '輸入搜尋關鍵字',
      NO_RESULTS: '找不到相關結果',
    },
  },
};

export default LOCALES;
