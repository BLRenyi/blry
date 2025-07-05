import '@testing-library/jest-dom';

// Global test setup for Vitest and React Testing Library
// This file is automatically loaded before running tests

// Mock environment variables for testing
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_API_URL: 'http://localhost:8000/api',
    VITE_APP_NAME: 'BLRY',
    VITE_APP_VERSION: '1.0.0',
    VITE_ENABLE_DEBUG: 'false',
    DEV: false,
    PROD: false,
    MODE: 'test',
  },
  writable: true,
});

// Suppress console.log in tests unless explicitly needed
const originalConsoleLog = console.log;
console.log = (...args) => {
  if (process.env.VITEST_VERBOSE) {
    originalConsoleLog(...args);
  }
};
