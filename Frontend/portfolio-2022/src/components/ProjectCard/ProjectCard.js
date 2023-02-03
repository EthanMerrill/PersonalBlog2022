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
    // JSX return
    // supabaseUrl+'storage/v1/object/public/project-photos'+/HYC/raceCoach.png
    return (
        <>
            <div className="w-full justify-end content-end flex flex-col my-20">
                <div className=" relative ml-auto mr-[50px] flex content-end sm:flex-wrap sm:justify-center flex-column w-2/3 bg-white rounded-2xl gap-[25px] p-[25px] drop-shadow">
                {images && 
                <div className="rounded h-[200px] w-[200px] shrink-0">
                    <img className="rounded-xl  h-[200px] w-[200px] object-cover" src={images[0]}/>
                </div>}
                    <div className="sm: min-w-[200px] shrink">
                        <h3 className="">{title}</h3>

                        <div className="pb-10">
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