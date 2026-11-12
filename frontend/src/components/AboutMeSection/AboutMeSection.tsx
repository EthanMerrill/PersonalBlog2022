import React from "react";

interface AboutMeSectionProps {
	width?: number;
	breakpoint?: number;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = () => (
	<div className="max-w-3xl text-main-text-gray text-lg">
		<p className="mb-4">Hi! I’m a software engineer based in Boston. I’m currently working at CapTech Consulting. I’m passionate about web development, and am always looking for new opportunities to learn and grow.</p>
		<p className="mb-4">I’m currently working on a few personal projects, including this website. I’m using it as a platform to showcase my work and share my thoughts on various topics.</p>
		<p>If you have any questions, ask my assistant using the chat bubble in the corner, or drop me a line directly!</p>
	</div>
);

export default AboutMeSection;
