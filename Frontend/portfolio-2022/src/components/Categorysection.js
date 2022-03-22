/* eslint-disable */
import React, { useEffect, useState } from "react";
import Projectcard from './Projectcard'

const Component = (props) => {
    //this component takes all the site data for one category and creates project cards for each project
    // destructure props
    console.log(props)
    const projects = props.props[0]
    const sectionNumber = props.props[1]
    // State Variables
    // const [variableName, setVariableName] = useState(null)

    //Use Effects
        //useEffect desc
    useEffect(()=> {
        
    },[])
    console.log(sectionNumber)
    // JSX return
    return(
        <>
            <h2 id={projects[0]?.Category} className={"dynamicTitle dt" + sectionNumber + " sticky " + projects[0]?.Category}><a href={"#"+projects[0]?.Category}>{projects[0]?.Category}</a> </h2>
            <div className='all-cards-container'>
            {projects?.map(e => {
                return <Projectcard key={e.id} props={e}></Projectcard>
            })}
            </div>
        </>
    )
}

export default Component