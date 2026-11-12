import {describe, test, expect} from "vitest";
import {assignColumns, assignLanes, buildTimeScale, itemSpan, resolveOverlaps, sortByRecency} from "./layout";
import type {TimelineItem} from "../../types/TimelineItem";

const NOW = Date.parse("2026-01-01T00:00:00.000Z");
const it = (id: string, startDate?: string, endDate?: string): TimelineItem => ({id, kind: "project", title: id, startDate, endDate});

describe("itemSpan", () => {
	test("runs open-ended items to now", () => {
		expect(itemSpan(it("a", "2024-01-01"), NOW)).toEqual({start: Date.parse("2024-01-01"), end: NOW, ongoing: true});
		expect(itemSpan(it("b", "2024-01-01", "2024-02-01"), NOW)?.ongoing).toBe(false);
		expect(itemSpan(it("c"), NOW)).toBeNull();
	});
});

describe("sortByRecency", () => {
	test("orders by end date (ongoing = now), then start, undated last", () => {
		const items = [
			it("old", "2020-01-01", "2020-06-01"),
			it("undated"),
			it("ongoingOld", "2019-01-01"),
			it("recentEnd", "2018-01-01", "2025-06-01"),
			it("ongoingNew", "2025-01-01"),
		];
		expect(sortByRecency(items, NOW).map((i) => i.id)).toEqual(["ongoingNew", "ongoingOld", "recentEnd", "old", "undated"]);
	});
});

describe("assignLanes", () => {
	test("reuses lanes only for non-overlapping intervals", () => {
		const {lanes, count} = assignLanes(
			[
				{top: 0, bottom: 100},
				{top: 50, bottom: 80},
				{top: 120, bottom: 150},
				{top: 82, bottom: 90},
			],
			4,
		);
		expect(lanes).toEqual([0, 1, 0, 2]);
		expect(count).toBe(3);
	});
});

describe("resolveOverlaps", () => {
	test("leaves separated boxes centred on their ideal", () => {
		expect(resolveOverlaps([{ideal: 100, height: 40}, {ideal: 300, height: 40}], 10)).toEqual([80, 280]);
	});

	test("spreads colliding boxes up and down around their shared centre", () => {
		const tops = resolveOverlaps([{ideal: 210, height: 100}, {ideal: 200, height: 100}], 10);
		// Cluster of 210px centred on the mean ideal (205): 100..310.
		expect(tops).toEqual([210, 100]);
	});

	test("never goes above minTop and cascades merges", () => {
		const tops = resolveOverlaps([{ideal: 0, height: 100}, {ideal: 60, height: 100}, {ideal: 150, height: 100}], 10, 0);
		expect(tops).toEqual([0, 110, 220]);
	});
});

describe("buildTimeScale", () => {
	const d = (s: string) => Date.parse(s);
	test("caps long quiet stretches and stretches to the target length", () => {
		// now → 2025-01-01: 365 days, capped to 100. 2025-01-01 → 2024-12-02: 30 days.
		const scale = buildTimeScale([d("2025-01-01"), d("2024-12-02")], NOW, 100, 1300);
		expect(scale.length).toBeCloseTo(1300);
		expect(scale.y(NOW)).toBe(0);
		expect(scale.y(d("2025-01-01"))).toBeCloseTo(1000);
		expect(scale.y(d("2024-12-17"))).toBeCloseTo(1150);
		expect(scale.gaps).toEqual([{top: 0, bottom: expect.closeTo(1000)}]);
	});

	test("is monotone and clamps outside the range", () => {
		const scale = buildTimeScale([d("2023-01-01"), d("2020-01-01")], NOW, 1000, 500);
		expect(scale.y(d("2030-01-01"))).toBe(0);
		expect(scale.y(d("2010-01-01"))).toBeCloseTo(500);
		expect(scale.y(d("2022-01-01"))).toBeLessThan(scale.y(d("2021-01-01")));
	});
});

describe("assignColumns", () => {
	test("keeps everything in one column when only one is available", () => {
		expect(assignColumns([{ideal: 100, height: 100}, {ideal: 120, height: 100}], 1, 10)).toEqual([0, 0]);
	});

	test("moves overlapping boxes outward and reuses the inner column when free", () => {
		const cols = assignColumns(
			[
				{ideal: 100, height: 100}, // 50..150
				{ideal: 130, height: 100}, // overlaps → column 1
				{ideal: 400, height: 100}, // clear → back to column 0
				{ideal: 140, height: 100}, // overlaps both → column that frees first
			],
			2,
			10,
		);
		expect(cols).toEqual([0, 1, 0, 0]);
	});
});
