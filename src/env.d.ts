/// <reference types="astro/client" />
declare module 'canvas-confetti';
declare module '@alpinejs/collapse';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
