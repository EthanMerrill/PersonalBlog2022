import type {NextConfig} from "next";

const nextConfig: NextConfig = {
	sassOptions: {
		includePaths: ["./src"],
	},
	outputFileTracingRoot: __dirname,
	// Static export: the site is served from GitHub Pages, which has no Node
	// runtime. `next build` emits ./out for upload-pages-artifact.
	output: "export",
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
