/* eslint-disable */
import React, { useEffect, useState } from "react";
import Projectcard from './Projectcard'

const Component = (props) => {
    //this component takes all the site data for one category and creates project cards for each project
    // destructure props
    const projects = props.props[0]
    const sectionNumber = props.props[1]
    // State Variables
    const [hover, setHover] = useState(false)
    const toggleHover = () => { setHover(!hover) }
    // const [variableName, setVariableName] = useState(null)

    return (
        <>
            <div className={"hover-sensor dynamicTitle dt" + sectionNumber + " sticky " + projects[0]?.Category} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                <div className="inline-block">
                    <h2 id={projects[0]?.Category} className={
                        "dynamicTitle dt" + sectionNumber + " sticky " + projects[0]?.Category + (hover ? " hover" : "")}>
                        <a href={"#" + projects[0]?.Category}>{projects[0]?.Category}</a>
                    </h2>
                </div>
            </div>
            <div className='all-cards-container'>
                {projects?.map(e => {
                    return <Projectcard key={e.id} props={e}></Projectcard>
                })}
            </div>
        </>
    )
}

export default Component