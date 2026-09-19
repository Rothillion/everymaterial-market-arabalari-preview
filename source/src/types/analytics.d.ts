export {};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void; [key: string]: unknown };
    gtag?: (...args: unknown[]) => void;
  }
}
