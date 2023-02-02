/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import Projectcard from "../ProjectCard/ProjectCard";
import { HashLink } from 'react-router-hash-link';


const Component = (props) => {
    //this component takes all the site data for one category and creates project cards for each project
    // destructure props
    const projects = props.props[0]
    const sectionNumber = props.props[1]
    // State Variables
    const [hover, setHover] = useState(false)
    const toggleHover = () => { setHover(!hover) }
    // const [variableName, setVariableName] = useState(null)
    const myRef = useRef();
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
            <h2 className={
                "dynamicTitle dt" + sectionNumber + " sticky " + projects[0]?.Category + (hover ? " hover" : "")} onMouseLeave={toggleHover} onMouseEnter={toggleHover}>
                <HashLink
                    smooth to={"#" + projects[0]?.Category}
                >{projects[0]?.Category}
                </HashLink>
            </h2>

            <div ref={myRef}  id={projects[0]?.Category} className=''>
                {projects?.map(e => {
                    return <Projectcard key={e.id} props={e}></Projectcard>
                })}
            </div>
        </>
    )
}

export default Component