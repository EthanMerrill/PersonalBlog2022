import { useEffect, useState, useRef } from "react";
import { HashLink } from 'react-router-hash-link';
import type { ReactNode } from 'react';
import React from "react";

interface IcategorySection {
    children: ReactNode;
    title: string;
    sectionNumber: number;
}

const CategorySection = (props: IcategorySection) => {
    //this component takes all the site data for one category and creates project cards for each project
    // destructure props
    const { children, title, sectionNumber } = props

    const [hover, setHover] = useState(false)

    const myRef = useRef<HTMLDivElement>(null);

    const observer = new IntersectionObserver((entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            setHover(true)
        } else {
            setHover(false)
        }
    });

    useEffect(() => {
        const currentRef = myRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        // Cleanup function to prevent memory leaks
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [observer]);

    return (
        <>
            <h2 className={
                "dynamicTitle rounded-lg sticky mt-16 sm:mt-2 mb-0 dt" + sectionNumber + ' animate-fadeSlow' + sectionNumber + (hover ? " hover" : "")}
            >
                <HashLink
                    smooth to={"#" + encodeURI(title)}
                >
                    {title}
                </HashLink>
            </h2>
            <div id={encodeURI(title)} ref={myRef} >
                {children}
            </div>
        </>
    )
}

export default CategorySection
