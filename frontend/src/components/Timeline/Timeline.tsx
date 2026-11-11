import React from "react";
import type {TimelineItem} from "../../types/TimelineItem";
import TimelineCard from "./TimelineCard";
import {formatDateRange} from "./formatDate";
import styles from "./Timeline.module.scss";

export default function Timeline({items}: {items: TimelineItem[]}) {
	return (
		<div className={styles.timeline}>
			<div className={styles.headers} aria-hidden="true">
				<h3 className={styles.headerLeft}>Work</h3>
				<span />
				<h3 className={styles.headerRight}>Projects</h3>
			</div>
			<ol className={styles.list}>
				{items.map((item) => {
					const side = item.kind === "experience" ? "left" : "right";
					const date = formatDateRange(item.startDate, item.endDate, item.kind);
					return (
						<li key={item.id} className={styles.item} data-side={side} data-kind={item.kind} data-testid="timeline-item">
							<div className={`${styles.cardCell} ${side === "left" ? styles.colLeft : styles.colRight}`}>
								<TimelineCard item={item} />
							</div>
							<span className={styles.dot} aria-hidden="true" />
							<div className={`${styles.labelCell} ${side === "left" ? styles.colRight : styles.colLeft}`}>
								{date && <span className={styles.dateLabel}>{date}</span>}
							</div>
						</li>
					);
				})}
			</ol>
		</div>
	);
}
