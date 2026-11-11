import React from "react";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {vi, describe, beforeEach, test, expect} from "vitest";

vi.mock("../../services/chatService", () => ({
	healthCheck: vi.fn().mockResolvedValue(true),
	sendChatMessage: vi.fn().mockResolvedValue("hello"),
}));

import ChatWidget from "./ChatWidget";
import {healthCheck} from "../../services/chatService";

const LABEL = "Chat with Ethan's assistant";

describe("ChatWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("is closed by default and does not call healthCheck", () => {
		render(<ChatWidget />);
		expect(screen.queryByRole("dialog")).toBeNull();
		expect(screen.getByRole("button", {name: LABEL}).getAttribute("aria-expanded")).toBe("false");
		expect(healthCheck).not.toHaveBeenCalled();
	});

	test("opens on click, focuses input, and calls healthCheck once", async () => {
		render(<ChatWidget />);
		const bubble = screen.getByRole("button", {name: LABEL});
		fireEvent.click(bubble);
		expect(screen.getByRole("dialog", {name: LABEL})).toBeTruthy();
		expect(bubble.getAttribute("aria-expanded")).toBe("true");
		expect(document.activeElement).toBe(screen.getByLabelText("Message"));
		await waitFor(() => expect(healthCheck).toHaveBeenCalledTimes(1));

		// Closing and reopening does not re-run the health check.
		fireEvent.click(bubble);
		fireEvent.click(bubble);
		expect(healthCheck).toHaveBeenCalledTimes(1);
	});

	test("Escape closes the panel and returns focus to the bubble", () => {
		render(<ChatWidget />);
		const bubble = screen.getByRole("button", {name: LABEL});
		fireEvent.click(bubble);
		fireEvent.keyDown(screen.getByLabelText("Message"), {key: "Escape"});
		expect(screen.queryByRole("dialog")).toBeNull();
		expect(bubble.getAttribute("aria-expanded")).toBe("false");
		expect(document.activeElement).toBe(bubble);
	});
});
