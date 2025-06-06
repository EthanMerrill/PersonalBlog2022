export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  error?: string;
}

export interface SecretResponse {
  secret?: string;
  error?: string;
}

class SecretsService {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    // Use environment variable for the backend URL
    this.baseUrl = import.meta.env.VITE_SECRETS_SERVICE_URL || "http://localhost:8080";

    // Try to load existing token from localStorage
    this.token = localStorage.getItem("secrets_token");
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
   * Get OpenAI API key
   */
  async getOpenAIKey(): Promise<string> {
    return this.getSecret("openai");
  }

  /**
   * Get a specific secret by name
   */
  async getSecret(secretName: string): Promise<string> {
    if (!this.token) {
      throw new Error("Not authenticated. Please call authenticate() first.");
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/secrets/${secretName}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (response.status === 401) {
        // Token expired or invalid
        this.clearToken();
        throw new Error("Authentication expired. Please re-authenticate.");
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch secret: ${response.status}`);
      }

      const data: SecretResponse = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.secret) {
        throw new Error("Secret not found");
      }

      return data.secret;
    } catch (error) {
      console.error(`Error fetching secret ${secretName}:`, error);
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
}

// Create and export a singleton instance
export const secretsService = new SecretsService();

// Export the class for testing purposes
export {SecretsService};
