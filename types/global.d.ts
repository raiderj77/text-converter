// Global type declarations for Google Analytics

interface Window {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;
}
