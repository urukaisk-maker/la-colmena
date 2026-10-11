import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.{test,spec}.{js,ts,mjs}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/web/**',
    ],
  },
});
