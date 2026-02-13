interface WpData {
  ajaxUrl: string;
  nonce: string;
  siteUrl: string;
  currentPage: number;
  pageSlug: string;
}

declare global {
  interface Window {
    wpData: WpData;
    gtag?: (...args: any[]) => void;
  }
}

export {};