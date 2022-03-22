/* eslint-disable */
import React, { useEffect, useState } from "react";

const Component = (props) => {
    // destructure props
    // const {propName} = props
    const Blurb = props?.props?.Blurb
    const Title = props?.props?.Title
    const Images = props?.props?.Images
    // State Vasriables
    // JSX return
    return(
        <>
            <div className="project-card-wrapper">
                <div>
                    {Images &&
                        Images.map((e, i) => {
                            for (var key in e) {
                                console.log(key, e[key])
                                return (
                                    
                                        <div className="card-image container">
                                            <img key={i} src={e[key]} alt={key}></img>
                                        </div>
                                    )
                            }

                        })
                    }
                </div>
                <div className="card-text-container">
                    <h3 className="card-title">{Title}</h3>

                    <div className="card-description">
                        <p>
                            {Blurb}
                        </p>
                </div>
               
                </div>
            </div>
        </>
    )
}

export default Component