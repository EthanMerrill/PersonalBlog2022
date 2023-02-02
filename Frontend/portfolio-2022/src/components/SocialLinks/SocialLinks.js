import React from "react";
import IconGithub from '../Icons/IconGithub.tsx'
import IconHashnode from "../Icons/IconHashnode.tsx";
import IconLinkedin from "../Icons/IconLinkedin.tsx";
import IconPrinter from "../Icons/IconPrinter.tsx";
import { Tooltip } from 'react-tooltip'

const SocialLinks = (props) => {
    // JSX return
    return(<>
        <div className="fixed right-0 p-3 rounded-l-2xl  bottom-10 social-links flex flex-col gap-7 justify-end font-sans text-lg z-10 bg-light-tan">
            < a id='github' className="fill-blue-accent h-5 w-5" href="https://github.com/EthanMerrill">
            <IconGithub/>   
            </a>
            < a className="fill-blue-accent h-5 w-5" href="https://www.linkedin.com/in/ethanmerrill/">
            <IconLinkedin/>   
            </a>
            < a className="fill-blue-accent h-5 w-5" href="https://www.printables.com/social/89492-ethanmerrill/">
            <IconPrinter/>   
            </a>
            < a className="fill-blue-accent h-5 w-5" href="https://ethanmakes.hashnode.dev/">
            <IconHashnode/>   
            </a>

        </div>
        <Tooltip anchorId="github"         
        content="Hello world! I'm a Tooltip"/>
        </>
    )
}

export default SocialLinks