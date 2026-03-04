export interface AuthCredentials {
	username: string;
	password: string;
}

export interface AuthResponse {
	token?: string;
	error?: string;
}

class SecretsService {
	private baseUrl: string;
	private token: string | null = null;

	constructor() {
		// Use environment variable for the backend URL
		this.baseUrl = import.meta.env.VITE_SECRETS_SERVICE_URL || "http://localhost:8080";

		// Try to load existing token from localStorage (guard for test environments)
		if (typeof localStorage !== "undefined") {
			this.token = localStorage.getItem("secrets_token");

			if (this.token && this.isTokenExpired(this.token)) {
				this.clearToken();
			}
		} else {
			this.token = null;
		}
	}

	private decodeTokenExpiry(token: string): number | null {
		try {
			const parts = token.split(".");
			if (parts.length < 2) return null;

			const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
			const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
			const payload = JSON.parse(atob(padded)) as {exp?: number};

			return typeof payload.exp === "number" ? payload.exp : null;
		} catch {
			return null;
		}
	}

	private isTokenExpired(token: string): boolean {
		const exp = this.decodeTokenExpiry(token);
		if (!exp) return true;

		const nowMs = Date.now();
		const expMs = exp * 1000;
		const refreshSkewMs = 30_000;
		return nowMs >= expMs - refreshSkewMs;
	}

	/**
	 * Authenticate with the secrets service
	 */
	async authenticate(credentials: AuthCredentials): Promise<boolean> {
		try {
			const response = await fetch(`${this.baseUrl}/auth`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
			});

			if (!response.ok) {
				throw new Error(`Authentication failed: ${response.status}`);
			}

			const data: AuthResponse = await response.json();

			if (data.error) {
				throw new Error(data.error);
			}

			if (data.token) {
				this.token = data.token;
				if (typeof localStorage !== "undefined") {
					localStorage.setItem("secrets_token", this.token);
				}
				return true;
			}

			return false;
		} catch (error) {
			console.error("Authentication error:", error);
			throw error;
		}
	}

	/**
	 * Check if user is authenticated
	 */
	isAuthenticated(): boolean {
		if (!this.token) return false;

		if (this.isTokenExpired(this.token)) {
			this.clearToken();
			return false;
		}

		return true;
	}

	/**
	 * Clear authentication token
	 */
	clearToken(): void {
		this.token = null;
		if (typeof localStorage !== "undefined") {
			localStorage.removeItem("secrets_token");
		}
	}

	/**
	 * Check service health
	 */
	async healthCheck(): Promise<boolean> {
		try {
			const response = await fetch(`${this.baseUrl}/health`);
			return response.ok;
		} catch (error) {
			console.error("Health check failed:", error);
			return false;
		}
	}

	/**
	 * Get the current JWT token
	 */
	getToken(): string | null {
		return this.isAuthenticated() ? this.token : null;
	}

	async getValidToken(credentials?: AuthCredentials): Promise<string | null> {
		if (this.isAuthenticated()) {
			return this.token;
		}

		if (!credentials) {
			return null;
		}

		const success = await this.authenticate(credentials);
		return success ? this.token : null;
	}
}

// Create and export a singleton instance
export const secretsService = new SecretsService();

// Export the class for testing purposes
export {SecretsService};
