/* eslint-disable */
import React, { useEffect, useState } from "react";

const Component = (props) => {
    // destructure props
    // const {propName} = props

    // State Variables
    // const [variableName, setVariableName] = useState(null)

    //Use Effects
        //useEffect desc
    useEffect(()=> {
        
    },[])
    // JSX return
    return(
        <>
            <div className="project-card-wrapper">
                <div className="card-image-container">
                    <img className="card-image" src="https://via.placeholder.com/200x200" alt="" />
                </div>
                <div className="card-text-container">
                    <h3 className="card-title">Test title</h3>

                    <div className="card-description">
                        <p>
                            • Served as project manager for the development of a mobile Augmented Reality (AR) application for a top 5 utility company.
                            •AR Application used for communicating electric transmission infrastructure placement on homeowner’s property.
                            • Developed a controls logging and monitoring dashboard for a top 3 US Bank.
                        </p>
                </div>
               
                </div>
            </div>
        </>
    )
}

export default Component