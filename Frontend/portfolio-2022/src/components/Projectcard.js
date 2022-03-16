/* eslint-disable */
import React, { useEffect, useState } from "react";

const Component = (props) => {
    // destructure props
    // const {propName} = props
    const Blurb = props?.props?.Blurb
    const Title = props?.props?.Title
    // State Variables
    // JSX return
    return(
        <>
            <div className="project-card-wrapper">
                <div className="card-image-container">
                    {/* <img className="card-image" src="https://xtfzyzbwuqavnjkmundy.supabase.in/storage/v1/object/sign/project-photos/foamwing.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9qZWN0LXBob3Rvcy9mb2Ftd2luZy5qcGciLCJpYXQiOjE2NDczOTA4NDYsImV4cCI6MTk2Mjc1MDg0Nn0.KcDSDyuSSak_gd2-Mdmyz5e-3HPTVrAaaNoVlfLtpZw" alt="" /> */}
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