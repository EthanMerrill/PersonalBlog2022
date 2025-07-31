/// <reference types="vitest" />
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      // Include .js files as JSX files
      include: "**/*.{jsx,js,ts,tsx}",
      jsxRuntime: "automatic",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // test: {
  //   globals: true,
  //   environment: "jsdom",
  //   setupFiles: "./src/setup-tests.ts",
  //   css: true,
  //   // Handle JSX in .js files
  //   include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  //   // Transform JSX in .js files
  //   esbuild: {
  //     jsxInject: `import React from 'react'`,
  //   },
  // },
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
