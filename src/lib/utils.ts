import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolve a public asset path.
 * In dev mode, Vite serves /public at root.
 * In WordPress, assets live under the theme's dist/ folder.
 */
export function assetUrl(path: string): string {
  if (window.wpData) {
    return `${window.wpData.themeUrl}/dist${path}`;
  }
  return path;
}
