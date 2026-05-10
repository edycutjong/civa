import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock IntersectionObserver
class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];
  disconnect() {}
  observe() {}
  takeRecords() { return []; }
  unobserve() {}
}
vi.stubGlobal('IntersectionObserver', IntersectionObserver);
window.IntersectionObserver = IntersectionObserver as unknown as typeof window.IntersectionObserver;
global.IntersectionObserver = IntersectionObserver as unknown as typeof global.IntersectionObserver;

// Mock ResizeObserver
class ResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserver);
window.ResizeObserver = ResizeObserver as unknown as typeof window.ResizeObserver;
global.ResizeObserver = ResizeObserver as unknown as typeof global.ResizeObserver;


// Mock getContext for canvas
// eslint-disable-next-line @typescript-eslint/no-explicit-any
HTMLCanvasElement.prototype.getContext = vi.fn() as any;

afterEach(cleanup);
