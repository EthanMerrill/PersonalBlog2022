import {describe, test, expect, vi, afterEach} from "vitest";
import {fetchTimelineItems} from "./timeline";

const rec = (o: Record<string, unknown>) => ({collectionId: "col1", ...o});

function mockFetch(body: unknown, ok = true) {
	const f = vi.fn().mockResolvedValue({ok, status: ok ? 200 : 500, statusText: ok ? "OK" : "ERR", json: async () => body});
	vi.stubGlobal("fetch", f);
	return f;
}

afterEach(() => {
	vi.unstubAllGlobals();
	vi.unstubAllEnvs();
});

describe("fetchTimelineItems", () => {
	test("requests the contract list URL and maps records", async () => {
		const f = mockFetch({
			items: [
				rec({
					id: "a1", kind: "project", title: "Proj", subtitle: "Sub", blurb: "B",
					start_date: "2023-01-02 21:03:07.360Z", end_date: "", ext_link: "https://x.dev", repo_link: "",
					image: "shot.png", image_alt: "Shot", tech: ["react", 5, "ts"],
				}),
			],
		});
		const items = await fetchTimelineItems();
		expect(f.mock.calls[0][0]).toBe(
			"https://data.merrill-api.com/api/collections/portfolio_timeline_items/records?perPage=200&sort=-start_date,-sort_weight"
		);
		expect(items).toEqual([
			{
				id: "a1", kind: "project", title: "Proj", subtitle: "Sub", blurb: "B",
				startDate: "2023-01-02T21:03:07.360Z", endDate: undefined, extLink: "https://x.dev", repoLink: undefined,
				imageUrl: "https://data.merrill-api.com/api/files/col1/a1/shot.png?thumb=800x0",
				imageAlt: "Shot", tech: ["react", "ts"],
			},
		]);
	});

	test("uses NEXT_PUBLIC_POCKETBASE_URL as base", async () => {
		vi.stubEnv("NEXT_PUBLIC_POCKETBASE_URL", "http://pb.local/");
		const f = mockFetch({items: []});
		await fetchTimelineItems();
		expect(f.mock.calls[0][0]).toMatch(/^http:\/\/pb\.local\/api\/collections\//);
	});

	test("sorts newest first, undated last, ties by sort_weight", async () => {
		mockFetch({
			items: [
				rec({id: "old", kind: "experience", title: "Old", start_date: "2021-01-01 00:00:00.000Z"}),
				rec({id: "none", kind: "project", title: "None"}),
				rec({id: "new", kind: "experience", title: "New", start_date: "2024-01-01 00:00:00.000Z"}),
				rec({id: "tieLow", kind: "project", title: "L", start_date: "2022-01-01 00:00:00.000Z", sort_weight: 1}),
				rec({id: "tieHigh", kind: "project", title: "H", start_date: "2022-01-01 00:00:00.000Z", sort_weight: 5}),
			],
		});
		const items = await fetchTimelineItems();
		expect(items.map((i) => i.id)).toEqual(["new", "tieHigh", "tieLow", "old", "none"]);
	});

	test("drops malformed records and tolerates junk fields", async () => {
		mockFetch({
			items: [
				null,
				{id: "x", kind: "other", title: "Bad kind"},
				{kind: "project", title: "No id"},
				rec({id: "ok", kind: "project", title: "Ok", start_date: "garbage", tech: "not json"}),
			],
		});
		const items = await fetchTimelineItems();
		expect(items).toHaveLength(1);
		expect(items[0].startDate).toBeUndefined();
		expect(items[0].tech).toBeUndefined();
	});

	test("throws on HTTP error and on bad payload", async () => {
		mockFetch({}, false);
		await expect(fetchTimelineItems()).rejects.toThrow(/500/);
		mockFetch({nope: true});
		await expect(fetchTimelineItems()).rejects.toThrow(/unexpected payload/);
	});
});
