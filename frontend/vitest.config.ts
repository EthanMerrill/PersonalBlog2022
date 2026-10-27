/// <reference types="vitest" />
import {defineConfig} from "vitest/config";
import path from "path";

export default defineConfig({
	test: {
		environment: "jsdom",
		setupFiles: "./src/setup-tests.ts",
		globals: true,
	},
	// Match Next's automatic JSX runtime so components without an explicit
	// `import React` (e.g. the icon components) render under test.
	esbuild: {
		jsx: "automatic",
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
