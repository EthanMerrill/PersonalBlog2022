import type {TimelineItem} from "../../types/TimelineItem";

export const DAY_MS = 86_400_000;

function parse(iso?: string): number | null {
	if (!iso) return null;
	const v = Date.parse(iso);
	return isNaN(v) ? null : v;
}

export interface Span {
	start: number;
	/** End timestamp; `now` when the item has no end date. */
	end: number;
	ongoing: boolean;
}

/** Start/end of an item in ms. Items without an end date run to `now`. Null when undated. */
export function itemSpan(item: TimelineItem, now: number): Span | null {
	const start = parse(item.startDate);
	if (start === null) return null;
	const endRaw = parse(item.endDate);
	const end = endRaw ?? Math.max(now, start);
	return {start, end: Math.max(end, start), ongoing: endRaw === null};
}

/** Most recent first: by end date (ongoing = now), then by start date. Undated items last. */
export function sortByRecency(items: TimelineItem[], now: number): TimelineItem[] {
	return items
		.map((item, i) => ({item, i, span: itemSpan(item, now)}))
		.sort((a, b) => {
			if (!a.span || !b.span) return a.span ? -1 : b.span ? 1 : a.i - b.i;
			return b.span.end - a.span.end || b.span.start - a.span.start || a.i - b.i;
		})
		.map((x) => x.item);
}

/**
 * Greedy interval lane assignment. Intervals are [top, bottom] in px; two
 * intervals share a lane only if separated by at least `gap`. Returns the lane
 * index for each interval (input order) and the number of lanes used.
 */
export function assignLanes(intervals: {top: number; bottom: number}[], gap: number): {lanes: number[]; count: number} {
	const order = intervals.map((_, i) => i).sort((a, b) => intervals[a].top - intervals[b].top);
	const laneBottoms: number[] = [];
	const lanes = new Array<number>(intervals.length);
	for (const i of order) {
		let lane = laneBottoms.findIndex((b) => b + gap <= intervals[i].top);
		if (lane === -1) lane = laneBottoms.length;
		laneBottoms[lane] = intervals[i].bottom;
		lanes[i] = lane;
	}
	return {lanes, count: laneBottoms.length};
}

/**
 * Place boxes on a vertical line as close as possible to their ideal centers
 * without overlapping. Overlapping boxes are merged into a cluster that is
 * centered on its members' ideal positions, so neighbours spread both up and
 * down. Returns each box's top (input order), never above `minTop`.
 */
export function resolveOverlaps(boxes: {ideal: number; height: number}[], gap: number, minTop = 0): number[] {
	interface Cluster {
		members: number[];
		top: number;
		height: number;
	}
	const order = boxes.map((_, i) => i).sort((a, b) => boxes[a].ideal - boxes[b].ideal);

	const place = (c: Cluster) => {
		// Least-squares fit: top = mean(ideal_i - offset_of_center_i).
		let offset = 0;
		let sum = 0;
		for (const m of c.members) {
			sum += boxes[m].ideal - (offset + boxes[m].height / 2);
			offset += boxes[m].height + gap;
		}
		c.height = offset - gap;
		c.top = Math.max(minTop, sum / c.members.length);
	};

	const clusters: Cluster[] = [];
	for (const i of order) {
		const c: Cluster = {members: [i], top: 0, height: 0};
		place(c);
		clusters.push(c);
		while (clusters.length > 1) {
			const cur = clusters[clusters.length - 1];
			const prev = clusters[clusters.length - 2];
			if (prev.top + prev.height + gap <= cur.top) break;
			prev.members.push(...cur.members);
			place(prev);
			clusters.pop();
		}
	}

	const tops = new Array<number>(boxes.length);
	for (const c of clusters) {
		let y = c.top;
		for (const m of c.members) {
			tops[m] = y;
			y += boxes[m].height + gap;
		}
	}
	return tops;
}

export interface TimeScale {
	/** Map a timestamp to px below the top of the scale (0 = `now`). */
	y: (t: number) => number;
	/** Total height in px from `now` to the oldest breakpoint. */
	length: number;
	/** px ranges whose time span was compressed. */
	gaps: {top: number; bottom: number}[];
}

/**
 * Piecewise-linear time scale running from `now` (y = 0) back to the oldest
 * breakpoint. Each stretch between consecutive breakpoints (item starts/ends)
 * counts for at most `capDays`, so long quiet periods don't leave empty
 * space; the result is then stretched to `targetLength` px.
 */
export function buildTimeScale(breakpoints: number[], now: number, capDays: number, targetLength: number): TimeScale {
	const ts = [...new Set([now, ...breakpoints.filter((t) => t <= now)])].sort((a, b) => b - a);
	const weights = ts.slice(1).map((t, i) => Math.min((ts[i] - t) / DAY_MS, capDays));
	const total = weights.reduce((a, b) => a + b, 0);
	const k = total > 0 ? targetLength / total : 0;
	const ys = [0];
	weights.forEach((w, i) => ys.push(ys[i] + w * k));
	const gaps = weights
		.map((_, i) => i)
		.filter((i) => (ts[i] - ts[i + 1]) / DAY_MS > capDays)
		.map((i) => ({top: ys[i], bottom: ys[i + 1]}));
	const y = (t: number) => {
		if (t >= ts[0]) return 0;
		for (let i = 1; i < ts.length; i++) {
			if (t >= ts[i]) return ys[i - 1] + ((ts[i - 1] - t) / (ts[i - 1] - ts[i])) * (ys[i] - ys[i - 1]);
		}
		return ys[ys.length - 1];
	};
	return {y, length: ys[ys.length - 1], gaps};
}

/**
 * Spread boxes across up to `columns` side-by-side columns. Boxes are taken in
 * order of their ideal top; each goes into the first (innermost) column where
 * it fits at its ideal position, otherwise into the column that frees up
 * soonest. Returns the column index for each box (input order).
 */
export function assignColumns(boxes: {ideal: number; height: number}[], columns: number, gap: number): number[] {
	const cols = new Array<number>(boxes.length).fill(0);
	if (columns <= 1) return cols;
	const bottoms = new Array<number>(columns).fill(-Infinity);
	const order = boxes.map((_, i) => i).sort((a, b) => boxes[a].ideal - boxes[b].ideal);
	for (const i of order) {
		const top = boxes[i].ideal - boxes[i].height / 2;
		let c = bottoms.findIndex((b) => b + gap <= top);
		if (c === -1) c = bottoms.indexOf(Math.min(...bottoms));
		cols[i] = c;
		bottoms[c] = Math.max(bottoms[c] + gap, top) + boxes[i].height;
	}
	return cols;
}
