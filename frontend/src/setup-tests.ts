// Vitest setup file
import "@testing-library/jest-dom";
import {vi} from "vitest";

// Mock IntersectionObserver for tests
class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
  }

  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  root: Element | Document | null = null;
  rootMargin: string = "0px";
  thresholds: ReadonlyArray<number> = [0];

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

global.IntersectionObserver = MockIntersectionObserver as any;

// Mock ResizeObserver for tests
class MockResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  callback: ResizeObserverCallback;

  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver as any;

// Mock window.matchMedia for tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Vitest global types - already available when globals: true is set in config
// This file is for any additional setup code for your tests
