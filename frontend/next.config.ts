import type {NextConfig} from "next";

const nextConfig: NextConfig = {
	sassOptions: {
		includePaths: ["./src"],
	},
	outputFileTracingRoot: __dirname,
};

export default nextConfig;
