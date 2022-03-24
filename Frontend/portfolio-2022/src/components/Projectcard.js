/* eslint-disable */
import React, { useEffect, useState } from "react";

const Component = (props) => {
    // destructure props
    // const {propName} = props
    const Blurb = props?.props?.Blurb
    const Title = props?.props?.Title
    const Images = props?.props?.Images
    // State Vasriables

    const [showPhotos, setShowPhotos] = useState(false)

    // JSX return
    return(
        <>
        <div className="project-card-wrapper">
            
                <div className="project-card-border" onMouseDown={() => setShowPhotos(!showPhotos)}>
                    <div className={showPhotos ? 'images-carousel-stacked' : 'images-carousel-unstacked'}>

                        {Images &&
                            Images.map((e, i) => {
                                for (var key in e) {
                                    console.log(i, key, e[key])
                                    return (
                                        <div className="card-image">
                                            <img classname={"image-" + i} key={i} src={e[key]} alt={key}></img>
                                        </div>
                                    )
                                }

                            })
                        }
                    </div>
                <div className="card-image-placeholder"></div>
                <div className="card-text-container">
                    <h3 className="card-title">{Title}</h3>

                    <div className="card-description">
                        <p>
                            {Blurb}
                        </p>
                </div>
               
                </div>
                </div>
            </div>
        </>
    )
}

export default Component