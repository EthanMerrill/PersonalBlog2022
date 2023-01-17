/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import CardButton from "./CardButton";
import PhotoCarousel from "./PhotoCarousel";

const ProjectCard = (props) => {
    // destructure props
    // const {propName} = props
    const externalLink = props?.props?.External_Link
    const blurb = props?.props?.Blurb
    const title = props?.props?.Title
    const images = props?.props?.ImageURLs
    // other vars
    // const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
    // State Vasriables

    const [hover, setHover] = useState(false)
    const [showPhotos, setShowPhotos] = useState(false)

    // JSX return
    // supabaseUrl+'storage/v1/object/public/project-photos'+/HYC/raceCoach.png
    return (
        <>
            <div className="project-card-wrapper">

                <div className={"project-card-border" + ((!hover && !showPhotos) ? "" : " hover")} onMouseDown={() => setShowPhotos(!showPhotos)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {images && <PhotoCarousel images={images} hover = {hover} showPhotos= {showPhotos}/>}
                    <div className="card-text-container">
                        <h3 className="card-title">{title}</h3>

                        <div className="card-description">
                            <p>
                                {blurb.substring(0,300)}{blurb.length > 300 && "..."}
                            </p>
                        </div>
                    </div>
                    {externalLink && <CardButton buttonText='Read More' buttonLink={externalLink}/>}
                </div>
            </div>
        </>
    )
}

export default ProjectCard