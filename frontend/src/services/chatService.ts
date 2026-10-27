/**
 * Client for the public chat API.
 *
 * This intentionally holds no credentials: the API keeps its OpenAI key
 * server-side and exposes only the chat capability. Anything shipped to the
 * browser is public, so no auth material belongs here.
 */

const DEFAULT_BASE_URL = "http://localhost:8080";

function baseUrl(): string {
	return process.env.NEXT_PUBLIC_SECRETS_SERVICE_URL || DEFAULT_BASE_URL;
}

/**
 * Check whether the chat API is reachable.
 */
export async function healthCheck(): Promise<boolean> {
	try {
		const response = await fetch(`${baseUrl()}/health`);
		return response.ok;
	} catch (error) {
		console.error("Health check failed:", error);
		return false;
	}
}

/**
 * Send a chat message and return the assistant's reply.
 */
export async function sendChatMessage(message: string): Promise<string> {
	const response = await fetch(`${baseUrl()}/api/chat`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({message}),
	});

	if (!response.ok) {
		if (response.status === 429) {
			throw new Error("You're sending messages a bit too quickly. Please wait a moment and try again.");
		}

		let backendError = `Backend chat API error: ${response.status}`;
		try {
			const errorData = await response.json();
			if (errorData?.error && typeof errorData.error === "string") {
				backendError = errorData.error;
			}
		} catch {
			// Ignore parse failures and keep the fallback error message.
		}

		throw new Error(backendError);
	}

	const data = await response.json();
	if (data.response) {
		return data.response;
	}

	throw new Error(data.error || "Sorry, I couldn't process that request.");
}
