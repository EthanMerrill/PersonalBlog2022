import React from "react";
import type {TimelineItem} from "../../types/TimelineItem";
import TimelineCard from "./TimelineCard";
import {DAY_MS, assignColumns, assignLanes, buildTimeScale, itemSpan, resolveOverlaps, sortByRecency, type Span} from "./layout";
import styles from "./Timeline.module.scss";

// Geometry of the time-scaled (desktop) layout, in px.
const PAD_TOP = 36; // room above "Now"
const MIN_BAR = 10; // short projects still get a visible pill
const MIN_BAR_DAYS = 14; // same idea, for lane assignment
const LANE_SPACING_DAYS = 7;
const QUIET_CAP_DAYS = 120; // stretches with nothing starting/ending count as at most this long
const MIN_YEAR_SPACING = 28;
const FALLBACK_CARD_H = 400; // before cards have been measured
// Timeline length relative to the stacked card height. >1 leaves breathing room
// between cards and lets them sit closer to their bars.
const TIMELINE_STRETCH = 1.5;
// Side-by-side cards (only when the timeline is wide enough for more than one per side).
const MIN_CARD_W = 300;
const MAX_CARD_W = 480;
const COL_GAP = 28;
const MAX_COLUMNS = 3;
const LANE_W = 6;
const LANE_GAP = 4;
const SPINE_GAP = 5; // spine centre → first lane
const CONNECT = 36; // outermost lane → card edge
const CARD_GAP = 28; // vertical space between cards on one side
const CONNECT_INSET = 24; // keep connector away from card corners
const DESKTOP_QUERY = "(min-width: 701px)";

type Side = "left" | "right";
const sideOf = (item: TimelineItem): Side => (item.kind === "experience" ? "left" : "right");

/** Distance from the spine centre to the centre of a lane. */
const laneOffset = (lane: number) => SPINE_GAP + lane * (LANE_W + LANE_GAP) + LANE_W / 2;

interface Sizes {
	width: number;
	heights: Record<string, number>;
	base: Record<string, number>;
}

const sameRecord = (a: Record<string, number>, b: Record<string, number>) =>
	Object.keys(a).length === Object.keys(b).length && Object.entries(b).every(([k, v]) => a[k] === v);

interface Bar {
	top: number;
	bottom: number;
	lane: number;
	ongoing: boolean;
}

function subscribeDesktop(onChange: () => void): () => void {
	if (typeof window.matchMedia !== "function") return () => {};
	const mq = window.matchMedia(DESKTOP_QUERY);
	mq.addEventListener("change", onChange);
	return () => mq.removeEventListener("change", onChange);
}
const desktopSnapshot = () => typeof window.matchMedia === "function" && window.matchMedia(DESKTOP_QUERY).matches;

// "Now" is fixed per page load and only read on the client; prerendered HTML uses the plain list layout.
let pageNow: number | undefined;
const nowSnapshot = () => (pageNow ??= Date.now());
const noSubscribe = () => () => {};

export default function Timeline({items}: {items: TimelineItem[]}) {
	const now = React.useSyncExternalStore<number | null>(noSubscribe, nowSnapshot, () => null);
	const desktop = React.useSyncExternalStore(subscribeDesktop, desktopSnapshot, () => false);
	const placed = desktop && now !== null;

	const sorted = React.useMemo(() => sortByRecency(items, now ?? Date.parse("2100-01-01")), [items, now]);

	// Measured sizes feed the time scale and the collision-avoiding card placement.
	const listRef = React.useRef<HTMLOListElement>(null);
	// `heights` are live; `base` are heights while collapsed, so expanding a card
	// doesn't rescale the whole timeline.
	const [sizes, setSizes] = React.useState<Sizes>({width: 0, heights: {}, base: {}});

	const {width, base} = sizes;
	const timeline = React.useMemo(() => {
		if (now === null) return null;
		const spans = new Map<string, Span>();
		for (const item of items) {
			const span = itemSpan(item, now);
			if (span) spans.set(item.id, span);
		}

		// Lanes are assigned in time units so they don't depend on the px scale.
		const lanes = new Map<string, number>();
		let half = 0;
		for (const side of ["left", "right"] as Side[]) {
			const ids = items.filter((i) => sideOf(i) === side && spans.has(i.id)).map((i) => i.id);
			const intervals = ids.map((id) => {
				const {start, end} = spans.get(id)!;
				const top = (now - end) / DAY_MS;
				return {top, bottom: Math.max((now - start) / DAY_MS, top + MIN_BAR_DAYS)};
			});
			const assigned = assignLanes(intervals, LANE_SPACING_DAYS);
			ids.forEach((id, i) => lanes.set(id, assigned.lanes[i]));
			half = Math.max(half, assigned.count > 0 ? laneOffset(assigned.count - 1) + LANE_W / 2 : SPINE_GAP);
		}
		half += CONNECT;

		// How many cards fit side by side on each half, and how wide they are.
		const sideW = width / 2 - half;
		const columns = width > 0 ? Math.max(1, Math.min(MAX_COLUMNS, Math.floor((sideW + COL_GAP) / (MIN_CARD_W + COL_GAP)))) : 1;
		const cardW = width > 0 ? Math.min(MAX_CARD_W, (sideW - (columns - 1) * COL_GAP) / columns) : 0;

		// Size the scale so each side's stack of cards roughly fills it.
		const stack = (side: Side) => items.filter((i) => sideOf(i) === side).reduce((sum, i) => sum + (base[i.id] ?? FALLBACK_CARD_H) + CARD_GAP, 0);
		const target = Math.max(stack("left") / columns, stack("right") / columns, 400) * TIMELINE_STRETCH;
		const breakpoints = [...spans.values()].flatMap((sp) => [sp.start, sp.end]);
		const scale = buildTimeScale(breakpoints, now, QUIET_CAP_DAYS, target);
		const yOf = (t: number) => PAD_TOP + scale.y(t);

		const bars = new Map<string, Bar>();
		spans.forEach((span, id) => {
			const top = yOf(span.end);
			bars.set(id, {top, bottom: Math.max(yOf(span.start), top + MIN_BAR), lane: lanes.get(id) ?? 0, ongoing: span.ongoing});
		});
		const timeBottom = PAD_TOP + scale.length;
		const years: {label: string; y: number}[] = [];
		let last = PAD_TOP;
		for (let y = new Date(now).getUTCFullYear(); ; y--) {
			const at = yOf(Date.UTC(y, 0, 1));
			if (at >= timeBottom) break;
			if (at - last >= MIN_YEAR_SPACING) {
				years.push({label: String(y), y: at});
				last = at;
			}
		}
		const gaps = scale.gaps.map((g) => ({top: g.top + PAD_TOP, bottom: g.bottom + PAD_TOP}));
		return {bars, half, timeBottom, years, gaps, columns, cardW};
	}, [items, now, width, base]);

	const measure = React.useCallback(() => {
		const list = listRef.current;
		if (!list) return;
		const heights: Record<string, number> = {};
		const expanded = new Set<string>();
		list.querySelectorAll<HTMLElement>("[data-item-id]").forEach((el) => {
			const id = el.dataset.itemId as string;
			heights[id] = el.offsetHeight;
			if (el.querySelector('[data-expanded="true"]')) expanded.add(id);
		});
		const width = list.clientWidth;
		setSizes((prev) => {
			const base: Record<string, number> = {};
			for (const id of Object.keys(heights)) base[id] = expanded.has(id) ? (prev.base[id] ?? heights[id]) : heights[id];
			const same = prev.width === width && sameRecord(prev.heights, heights) && sameRecord(prev.base, base);
			return same ? prev : {width, heights, base};
		});
	}, []);
	React.useLayoutEffect(() => {
		if (placed) measure();
	});
	React.useEffect(() => {
		const list = listRef.current;
		if (!placed || !list || typeof ResizeObserver === "undefined") return;
		const ro = new ResizeObserver(measure);
		ro.observe(list);
		list.querySelectorAll("[data-item-id]").forEach((el) => ro.observe(el));
		return () => ro.disconnect();
	}, [placed, measure, sorted]);

	const cards = React.useMemo(() => {
		if (!timeline) return null;
		const tops = new Map<string, number>();
		const cols = new Map<string, number>();
		for (const side of ["left", "right"] as Side[]) {
			const sideItems = sorted.filter((i) => sideOf(i) === side);
			const boxes = sideItems.map((item) => {
				const bar = timeline.bars.get(item.id);
				const height = sizes.heights[item.id] ?? FALLBACK_CARD_H;
				// Undated items sink below the dated ones.
				const ideal = bar ? (bar.top + bar.bottom) / 2 : timeline.timeBottom + height;
				return {ideal, height};
			});
			// Overlapping cards move outward into extra columns when there's room,
			// then each column is de-overlapped vertically.
			const assigned = assignColumns(boxes, timeline.columns, CARD_GAP);
			for (let c = 0; c < timeline.columns; c++) {
				const members = boxes.map((_, i) => i).filter((i) => assigned[i] === c);
				const resolved = resolveOverlaps(members.map((i) => boxes[i]), CARD_GAP, 0);
				members.forEach((i, k) => {
					tops.set(sideItems[i].id, resolved[k]);
					cols.set(sideItems[i].id, c);
				});
			}
		}
		let bottom = timeline.timeBottom + PAD_TOP;
		for (const item of sorted) bottom = Math.max(bottom, (tops.get(item.id) ?? 0) + (sizes.heights[item.id] ?? 0) + CARD_GAP);
		return {tops, cols, height: bottom};
	}, [timeline, sorted, sizes]);

	/** Inner edge (nearest the spine) of a card in column `col`, in px from the list's left. */
	const innerEdge = (side: Side, col: number) =>
		timeline ? width / 2 + (side === "left" ? -1 : 1) * (timeline.half + col * (timeline.cardW + COL_GAP)) : 0;

	// Hovering a card highlights its bar and connector, and vice versa.
	const [active, setActive] = React.useState<string | null>(null);
	const hoverProps = React.useCallback(
		(id: string) => ({
			onMouseEnter: () => setActive(id),
			onMouseLeave: () => setActive((a) => (a === id ? null : a)),
		}),
		[],
	);

	const geometry = placed && timeline && cards;
	const gutterStyle = geometry ? ({"--half": `${timeline.half}px`} as React.CSSProperties) : undefined;

	return (
		<div className={`${styles.timeline} ${geometry ? styles.placed : ""}`} style={gutterStyle}>
			<div className={styles.headers} aria-hidden="true">
				<div className={styles.headerLeft}>
					<h3>Work</h3>
					<p>What I get paid for</p>
				</div>
				<span />
				<div className={styles.headerRight}>
					<h3>Projects</h3>
					<p>Things I build for fun...unless?</p>
				</div>
			</div>
			<ol ref={listRef} className={styles.list} style={geometry ? {height: cards.height} : undefined}>
				{sorted.map((item) => {
					const side = sideOf(item);
					const top = geometry ? cards.tops.get(item.id) : undefined;
					const col = geometry ? (cards.cols.get(item.id) ?? 0) : 0;
					let placement: React.CSSProperties | undefined;
					if (geometry && top !== undefined) {
						placement = {top};
						if (width > 0) {
							const edge = innerEdge(side, col);
							placement = {top, width: timeline.cardW, left: side === "left" ? edge - timeline.cardW : edge};
						}
					}
					return (
						<li
							key={item.id}
							className={`${styles.item} ${active === item.id ? styles.active : ""}`}
							data-side={side}
							data-kind={item.kind}
							data-item-id={item.id}
							data-testid="timeline-item"
							style={placement}
							onMouseEnter={() => setActive(item.id)}
							onMouseLeave={() => setActive((a) => (a === item.id ? null : a))}
							onFocus={() => setActive(item.id)}
							onBlur={() => setActive((a) => (a === item.id ? null : a))}>
							<div className={`${styles.cardCell} ${side === "left" ? styles.colLeft : styles.colRight}`}>
								<TimelineCard item={item} />
							</div>
							<span className={styles.dot} aria-hidden="true" />
						</li>
					);
				})}
				{geometry && <TimeScale timeline={timeline} cards={cards} items={sorted} width={width} heights={sizes.heights} innerEdge={innerEdge} active={active} hoverProps={hoverProps} />}
			</ol>
		</div>
	);
}

interface TimeScaleProps {
	timeline: {bars: Map<string, Bar>; half: number; years: {label: string; y: number}[]; gaps: {top: number; bottom: number}[]};
	cards: {tops: Map<string, number>; cols: Map<string, number>; height: number};
	items: TimelineItem[];
	width: number;
	heights: Record<string, number>;
	innerEdge: (side: Side, col: number) => number;
	active: string | null;
	hoverProps: (id: string) => {onMouseEnter: () => void; onMouseLeave: () => void};
}

/** Duration bars, card connectors and year markers, drawn behind/around the cards. */
function TimeScale({timeline, cards, items, width, heights, innerEdge, active, hoverProps}: TimeScaleProps) {
	const cx = width / 2;
	const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), Math.max(lo, hi));
	return (
		<li className={styles.scale} aria-hidden="true">
			{width > 0 && (
				<svg className={styles.connectors} width={width} height={cards.height}>
					{items.map((item) => {
						const bar = timeline.bars.get(item.id);
						const top = cards.tops.get(item.id);
						if (!bar || top === undefined) return null;
						const h = heights[item.id] ?? 0;
						const dir = sideOf(item) === "left" ? -1 : 1;
						const barMid = (bar.top + bar.bottom) / 2;
						const yCard = clamp(barMid, top + CONNECT_INSET, top + h - CONNECT_INSET);
						const yBar = clamp(yCard, bar.top + 3, bar.bottom - 3);
						// Connectors from outer columns run behind the inner cards.
						const xCard = innerEdge(sideOf(item), cards.cols.get(item.id) ?? 0);
						const xBar = cx + dir * (laneOffset(bar.lane) + LANE_W / 2);
						const xMid = (xCard + xBar) / 2;
						return (
							<g key={item.id} className={active === item.id ? styles.active : undefined} {...hoverProps(item.id)}>
								<path d={`M${xCard},${yCard} C${xMid},${yCard} ${xMid},${yBar} ${xBar},${yBar}`} />
								<path className={styles.hit} d={`M${xCard},${yCard} C${xMid},${yCard} ${xMid},${yBar} ${xBar},${yBar}`} />
								<circle cx={xBar} cy={yBar} r={2.5} />
							</g>
						);
					})}
				</svg>
			)}
			{items.map((item) => {
				const bar = timeline.bars.get(item.id);
				if (!bar) return null;
				const dir = sideOf(item) === "left" ? -1 : 1;
				const offset = laneOffset(bar.lane);
				return (
					<span
						key={item.id}
						className={`${styles.bar} ${item.kind === "experience" ? styles.barWork : styles.barProject} ${bar.ongoing ? styles.ongoing : ""} ${active === item.id ? styles.active : ""}`}
						style={{top: bar.top, height: bar.bottom - bar.top, left: `calc(50% + ${dir * offset - LANE_W / 2}px)`, width: LANE_W}}
						{...hoverProps(item.id)}
					/>
				);
			})}
			{timeline.gaps.map((g) => (
				<span key={g.top} className={styles.gap} style={{top: g.top + 14, height: Math.max(0, g.bottom - g.top - 28)}} />
			))}
			<span className={styles.yearMark} style={{top: PAD_TOP}}>
				Now
			</span>
			{timeline.years.map((y) => (
				<span key={y.label} className={styles.yearMark} style={{top: y.y}}>
					{y.label}
				</span>
			))}
		</li>
	);
}
