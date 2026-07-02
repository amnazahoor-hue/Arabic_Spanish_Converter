/**
 * Minimal replacement for Next.js built-in polyfill-module.
 * Modern targets (Chrome/Edge/Firefox 111+, Safari/iOS 16.4+) already ship
 * Array.at, Object.hasOwn, flat/flatMap, trimStart/trimEnd, etc.
 * Only URL.canParse may be missing on Safari 16.4.
 */
if (typeof URL !== "undefined" && typeof URL.canParse !== "function") {
  URL.canParse = function canParse(url, base) {
    try {
      new URL(url, base);
      return true;
    } catch {
      return false;
    }
  };
}
