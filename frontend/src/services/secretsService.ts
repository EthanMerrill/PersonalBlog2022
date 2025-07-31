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
    } else {
      this.token = null;
    }
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
        localStorage.setItem("secrets_token", this.token);
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
    return this.token !== null;
  }

  /**
   * Clear authentication token
   */
  clearToken(): void {
    this.token = null;
    localStorage.removeItem("secrets_token");
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
    return this.token;
  }
}

// Create and export a singleton instance
export const secretsService = new SecretsService();

// Export the class for testing purposes
export {SecretsService};
