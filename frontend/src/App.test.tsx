import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, beforeEach, test, expect, beforeAll, afterAll } from 'vitest';
import App from './App';

// Mock window properties (guard for test environments)
let mockAddEventListener: ReturnType<typeof vi.fn> | undefined;
let mockRemoveEventListener: ReturnType<typeof vi.fn> | undefined;
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1024,
  });

  mockAddEventListener = vi.fn();
  mockRemoveEventListener = vi.fn();

  Object.defineProperty(window, 'addEventListener', {
    writable: true,
    configurable: true,
    value: mockAddEventListener,
  });

  Object.defineProperty(window, 'removeEventListener', {
    writable: true,
    configurable: true,
    value: mockRemoveEventListener,
  });
}

beforeAll(() => {
  // Mock IntersectionObserver for jsdom
  class MockIntersectionObserver {
    constructor() { }
    observe() { }
    unobserve() { }
    disconnect() { }
    takeRecords() { return []; }
  }
  // @ts-ignore
  global.IntersectionObserver = MockIntersectionObserver;
});

afterAll(() => {
  // Clean up IntersectionObserver mock
  if (global.IntersectionObserver) {
    // @ts-ignore
    delete global.IntersectionObserver;
  }
  // Clean up requestAnimationFrame/cancelAnimationFrame mocks from window
  if (typeof window !== 'undefined') {
    if (window.requestAnimationFrame) {
      // @ts-ignore
      delete window.requestAnimationFrame;
    }
    if (window.cancelAnimationFrame) {
      // @ts-ignore
      delete window.cancelAnimationFrame;
    }
  }
});

describe('App Component', () => {
  beforeEach(() => {
    if (mockAddEventListener) mockAddEventListener.mockClear();
    if (mockRemoveEventListener) mockRemoveEventListener.mockClear();
  });

  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check if the main app container is rendered
    const mainBody = document.querySelector('.main-body');
    expect(mainBody).not.toBeNull();
  });
});
