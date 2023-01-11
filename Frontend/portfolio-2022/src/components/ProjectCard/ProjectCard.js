/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";

const ProjectCard = (props) => {
    // destructure props
    // const {propName} = props
    const Blurb = props?.props?.Blurb
    const Title = props?.props?.Title
    const Images = props?.props?.ImageURLs
    // other vars
    // const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
    // State Vasriables

    const [showPhotos, setShowPhotos] = useState(false)
    const [hover, setHover] = useState(false)
    //ref
    const theRef = useRef();
    // JSX return
    // supabaseUrl+'storage/v1/object/public/project-photos'+/HYC/raceCoach.png
    return (
        <>
            <div className="project-card-wrapper">

                <div className={"project-card-border" + ((!hover && !showPhotos) ? "" : " hover")} onMouseDown={() => setShowPhotos(!showPhotos)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <div ref = {theRef} className={showPhotos ? "carousel-container unstacked" : "carousel-container stacked"+((!hover&&!showPhotos) ? "":" hover")} onScroll={() => handleScroll}>
                        <div className="imc">
                            {Images &&
                                Images.map((e, i) => {
                                    for (var key in e) {
                                        return (
                                            <div key = {i} className={"card-image image-" + i}>
                                                <img className={"image-"} key={i} src={e} alt={key}></img>
                                                
                                            </div>
                                        )
                                    }

                                })
                            }
                        </div>
                    </div>
                    <div className="card-text-container">
                        <h3 className="card-title">{Title}</h3>

                        <div className="card-description">
                            <p>
                                {Blurb.substring(0,300)}{Blurb.length > 300 && "..."}
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default ProjectCard