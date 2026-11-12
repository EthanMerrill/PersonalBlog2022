import {defineConfig, globalIgnores} from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
	...nextVitals,
	...nextTs,
	// Tooling config files are CommonJS by convention.
	{files: ["*.config.js"], rules: {"@typescript-eslint/no-require-imports": "off"}},
	globalIgnores([".next/**", "out/**", "build/**", "dist/**", "next-env.d.ts", "coverage/**"]),
]);
