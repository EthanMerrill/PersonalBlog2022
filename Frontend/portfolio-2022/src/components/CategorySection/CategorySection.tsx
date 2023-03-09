import { useEffect, useState, useRef } from "react";
import { HashLink } from 'react-router-hash-link';
import type {ReactNode} from 'react';

interface IcategorySection {
    children: ReactNode;
    title: string;
    sectionNumber: number;
}

const CategorySection = (props:IcategorySection) => {
    //this component takes all the site data for one category and creates project cards for each project
    // destructure props
    const { children,title, sectionNumber} = props

    // const projects = props.props[0]
    // const sectionNumber = props.props[1]
    // State Variables
    const [hover, setHover] = useState(false)
    const toggleHover = () => { setHover(!hover) }
    // const [variableName, setVariableName] = useState(null)
    const myRef = useRef() as any;
    const observer = new IntersectionObserver((entries, observer) => {
        const entry = entries[0];
        if(entry.isIntersecting){
            setHover(true)
        }else{
            setHover(false)
        }
    });

    useEffect(() => {
        observer.observe(myRef.current);
    }, []);

    return (
       <>
            <h2 id ={encodeURI(title)} className={
                "dynamicTitle  rounded-lg sticky mt-16 mb-0 dt" + sectionNumber +' animate-fadeSlow'+sectionNumber + (hover ? " hover" : "")} 
                onMouseLeave={toggleHover} 
                onMouseEnter={toggleHover}>
                <HashLink
                    smooth to={"#" + encodeURI(title)}
                >{title}
                </HashLink>
            </h2>
                <div ref={myRef} >
                {children}
            </div>
            </>
    )
}

export default CategorySection
