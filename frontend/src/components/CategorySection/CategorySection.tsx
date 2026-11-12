import {useEffect, useState, useRef} from "react";
import type {ReactNode} from "react";
import React from "react";
import styles from "./CategorySection.module.scss";

interface CategorySectionProps {
	children: ReactNode;
	title: string;
	/** Anchor id for the section, e.g. "about". */
	id: string;
	sectionNumber: number;
}

const CategorySection = ({children, title, id, sectionNumber}: CategorySectionProps) => {
	// The underline draws in while the section is on screen.
	const [inView, setInView] = useState(false);
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || typeof IntersectionObserver === "undefined") return;
		// Created inside the effect so the component can be prerendered (no browser APIs during render)
		const observer = new IntersectionObserver((entries) => setInView(entries[0].isIntersecting));
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<section id={id} ref={ref} className={styles.section}>
			<div className={`${styles.head} ${inView ? styles.inView : ""}`}>
				<span className={styles.index} aria-hidden="true">
					{String(sectionNumber).padStart(2, "0")}
				</span>
				<h2 className={styles.title}>
					<a href={`#${id}`}>{title}</a>
				</h2>
			</div>
			{children}
		</section>
	);
};

export default CategorySection;
