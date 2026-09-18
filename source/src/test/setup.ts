import "@testing-library/jest-dom/vitest";

// Mock IntersectionObserver for scroll-reveal hooks — observe() fires the callback
// synchronously as "intersecting" so useInView-gated content (e.g. count-up stats)
// resolves to its real in-view state in tests instead of staying stuck pending.
global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(private callback: IntersectionObserverCallback) {}
  disconnect() {}
  observe(target: Element) {
    this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this);
  }
  takeRecords() {
    return [];
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver;
