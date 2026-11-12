import React from "react";
import {render, screen} from "@testing-library/react";
import {describe, test, expect} from "vitest";
import Timeline from "./Timeline";
import {formatDateRange} from "./formatDate";
import type {TimelineItem} from "../../types/TimelineItem";

const items: TimelineItem[] = [
	{id: "1", kind: "experience", title: "Job B", startDate: "2025-06-01T00:00:00.000Z", extLink: "https://job.dev"},
	{id: "2", kind: "experience", title: "Job A", startDate: "2024-01-01T00:00:00.000Z", endDate: "2025-05-01T00:00:00.000Z"},
	{id: "3", kind: "project", title: "Proj", startDate: "2022-04-01T00:00:00.000Z", endDate: "2022-04-20T00:00:00.000Z", repoLink: "https://gh.dev/p", imageUrl: "https://img/x.png", imageAlt: "An image"},
];

describe("Timeline", () => {
	test("places experience on the left and projects on the right, most recent first", () => {
		render(<Timeline items={[items[2], items[1], items[0]]} />);
		const rows = screen.getAllByTestId("timeline-item");
		expect(rows.map((r) => r.getAttribute("data-side"))).toEqual(["left", "left", "right"]);
		expect(rows[0]).toHaveTextContent("Job B");
		expect(rows[2]).toHaveTextContent("Proj");
		expect(screen.getByRole("heading", {name: "Work", hidden: true, level: 3})).toBeInTheDocument();
		expect(screen.getByRole("heading", {name: "Projects", hidden: true, level: 3})).toBeInTheDocument();
	});

	test("renders links, image and date labels", () => {
		render(<Timeline items={items} />);
		const visit = screen.getByText("Visit →");
		expect(visit).toHaveAttribute("rel", "noopener noreferrer");
		expect(visit).toHaveAttribute("target", "_blank");
		expect(screen.getByText("Code →")).toHaveAttribute("href", "https://gh.dev/p");
		const img = screen.getByAltText("An image");
		expect(img).toHaveAttribute("loading", "lazy");
		expect(screen.getAllByText("Jun 2025 – Present").length).toBeGreaterThan(0);
		expect(screen.getAllByText("Apr 2022").length).toBeGreaterThan(0);
	});
});

describe("formatDateRange", () => {
	test("formats ranges", () => {
		expect(formatDateRange("2024-01-01T00:00:00.000Z", "2025-05-01T00:00:00.000Z")).toBe("Jan 2024 – May 2025");
		expect(formatDateRange("2022-04-01T00:00:00.000Z", "2022-04-20T00:00:00.000Z")).toBe("Apr 2022");
		expect(formatDateRange("2022-04-01T00:00:00.000Z")).toBe("Apr 2022 – Present");
		expect(formatDateRange(undefined, undefined)).toBe("");
	});
});
