/// <reference types="vitest" />
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Include .js files as JSX files
      include: "**/*.{jsx,js,ts,tsx}",
      jsxRuntime: "automatic",
      babel: {
        parserOpts: {
          plugins: ["jsx", "typescript"],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  // Configure environment variables (Vite uses VITE_ prefix instead of REACT_APP_)
  envPrefix: "VITE_",
  // Base path for GitHub Pages deployment
  base: "/",
  // Server configuration
  server: {
    port: 3000,
    open: true,
  },
  // Build configuration
  build: {
    outDir: "dist",
    sourcemap: true,
    // Configure chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    // Handle JSX in JS files
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // Configure esbuild
  esbuild: {
    jsx: "automatic",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
  // Optimize dependencies
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  // Test configuration
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup-tests.ts",
    css: true,
    // Handle JSX in .js files
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
