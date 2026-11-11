import {useEffect, useState, useRef} from "react";
import type {ReactNode} from "react";
import React from "react";

interface IcategorySection {
	children: ReactNode;
	title: string;
	sectionNumber: number;
}

const CategorySection = (props: IcategorySection) => {
	//this component takes all the site data for one category and creates project cards for each project
	// destructure props
	const {children, title, sectionNumber} = props;

	const [hover, setHover] = useState(false);

	const myRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const currentRef = myRef.current;
		if (!currentRef || typeof IntersectionObserver === "undefined") return;
		// Created inside the effect so the component can be prerendered (no browser APIs during render)
		const observer = new IntersectionObserver((entries) => {
			setHover(entries[0].isIntersecting);
		});
		observer.observe(currentRef);
		return () => observer.disconnect();
	}, []);

	return (
		<>
			<h2 className={"dynamicTitle rounded-lg sticky mt-16 sm:mt-2 mb-0 dt" + sectionNumber + " animate-fadeSlow" + sectionNumber + (hover ? " hover" : "")}>
				<a href={"#" + encodeURI(title)}>{title}</a>
			</h2>
			<div id={encodeURI(title)} ref={myRef}>
				{children}
			</div>
		</>
	);
};

export default CategorySection;
