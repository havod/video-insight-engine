interface WpData {
  ajaxUrl: string;
  nonce: string;
  siteUrl: string;
  themeUrl: string;
  currentPage: number;
  pageSlug: string;
  isHome: boolean;
}

interface Window {
  wpData?: WpData;
}
