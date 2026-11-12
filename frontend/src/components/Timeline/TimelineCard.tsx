import React from "react";
import type {TimelineItem} from "../../types/TimelineItem";
import {formatDateRange} from "./formatDate";
import styles from "./Timeline.module.scss";

const MAX_TAGS = 4;

export default function TimelineCard({item}: {item: TimelineItem}) {
	const date = formatDateRange(item.startDate, item.endDate);

	// Long blurbs are clamped to a few lines; the toggle only appears when text is actually cut off.
	const blurbRef = React.useRef<HTMLParagraphElement>(null);
	const [expanded, setExpanded] = React.useState(false);
	const [clamped, setClamped] = React.useState(false);
	React.useEffect(() => {
		const el = blurbRef.current;
		if (!el || typeof ResizeObserver === "undefined") return;
		const ro = new ResizeObserver(() => setClamped(el.scrollHeight > el.clientHeight + 1));
		ro.observe(el);
		return () => ro.disconnect();
	}, []);
	const blurbId = `blurb-${item.id}`;

	// Long tag lists show the first few plus a "+N" chip until expanded.
	const tech = item.tech ?? [];
	// A "+1" chip would take the same space as the tag it hides, so only collapse 2+.
	const collapsibleTech = tech.length > MAX_TAGS + 1;
	const shownTech = expanded || !collapsibleTech ? tech : tech.slice(0, MAX_TAGS);
	const hiddenTech = tech.length - shownTech.length;
	const canExpand = clamped || expanded || collapsibleTech;
	const work = item.kind === "experience";

	return (
		<article data-expanded={expanded} className={`${styles.card} ${work ? styles.cardWork : styles.cardProject}`}>
			{item.imageUrl && (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={item.imageUrl}
					alt={item.imageAlt ?? ""}
					loading="lazy"
					decoding="async"
					width={800}
					height={333}
					className={`${styles.image} object-cover w-full`}
				/>
			)}
			<div className={styles.body}>
				<div className={styles.meta}>
					<span className={`${styles.tag} ${work ? styles.tagWork : styles.tagProject}`}>{work ? "Work" : "Project"}</span>
					{date && <span className={styles.date}>{date}</span>}
				</div>
				<h3 className={styles.title}>{item.title}</h3>
				{item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
				{item.blurb && (
					<p ref={blurbRef} id={blurbId} className={`${styles.blurb} ${expanded ? "" : styles.blurbClamped}`}>
						{item.blurb}
					</p>
				)}
				{shownTech.length > 0 && (
					<ul className={styles.tech}>
						{shownTech.map((t) => (
							<li key={t}>{t}</li>
						))}
						{hiddenTech > 0 && <li className={styles.techMore}>+{hiddenTech}</li>}
					</ul>
				)}
				{(item.extLink || item.repoLink || canExpand) && (
					<div className={styles.footer}>
						{item.extLink && (
							<a href={item.extLink} target="_blank" rel="noopener noreferrer">Visit →</a>
						)}
						{item.repoLink && (
							<a href={item.repoLink} target="_blank" rel="noopener noreferrer">Code →</a>
						)}
						{canExpand && (
							<button
								type="button"
								className={styles.more}
								aria-expanded={expanded}
								aria-controls={item.blurb ? blurbId : undefined}
								onClick={() => setExpanded((e) => !e)}>
								{expanded ? "Show less" : "Show more"}
							</button>
						)}
					</div>
				)}
			</div>
		</article>
	);
}
