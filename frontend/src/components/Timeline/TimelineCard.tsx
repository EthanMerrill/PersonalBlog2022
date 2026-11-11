import React from "react";
import type {TimelineItem} from "../../types/TimelineItem";
import {formatDateRange} from "./formatDate";
import styles from "./Timeline.module.scss";

export default function TimelineCard({item}: {item: TimelineItem}) {
	const date = formatDateRange(item.startDate, item.endDate, item.kind);
	return (
		<article className={`${styles.card} rounded-sm bg-gray-100 drop-shadow-lg hover:shadow-lg transition-shadow`}>
			{item.imageUrl && (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={item.imageUrl}
					alt={item.imageAlt ?? ""}
					loading="lazy"
					decoding="async"
					width={800}
					height={450}
					className={`${styles.image} object-cover w-full rounded-t-sm`}
				/>
			)}
			<div className="p-5 text-sm text-main-text-gray">
				<span className={`${styles.tag} ${item.kind === "experience" ? styles.tagWork : styles.tagProject}`}>
					{item.kind === "experience" ? "Work" : "Project"}
				</span>
				<h3 className="text-lg opacity-90">{item.title}</h3>
				{item.subtitle && <p className="opacity-80">{item.subtitle}</p>}
				{date && <p className={`${styles.cardDate} text-xs opacity-70 mt-1`}>{date}</p>}
				{item.blurb && <p className="opacity-80 mt-2 text-left">{item.blurb}</p>}
				{item.tech && item.tech.length > 0 && (
					<ul className="flex flex-wrap gap-1 mt-3">
						{item.tech.map((t) => (
							<li key={t} className="rounded-full px-2 text-xs bg-notion-gray">{t}</li>
						))}
					</ul>
				)}
				{(item.extLink || item.repoLink) && (
					<div className="flex gap-4 mt-3">
						{item.extLink && (
							<a href={item.extLink} target="_blank" rel="noopener noreferrer" className="text-blue-accent hover:underline">Visit →</a>
						)}
						{item.repoLink && (
							<a href={item.repoLink} target="_blank" rel="noopener noreferrer" className="text-blue-accent hover:underline">Code →</a>
						)}
					</div>
				)}
			</div>
		</article>
	);
}
