/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    // setupFiles: './src/setup-tests.ts', // Uncomment if you have a setup file
  },
});
