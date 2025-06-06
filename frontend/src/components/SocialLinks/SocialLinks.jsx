import React from "react";
import IconGithub from '../Icons/IconGithub'
import IconHashnode from "../Icons/IconHashnode";
import IconLinkedin from "../Icons/IconLinkedin";
import IconPrinter from "../Icons/IconPrinter";
import { Tooltip } from "react-tooltip";

const SocialLinks = ({ className }) => {
    // JSX return
    return (<>
        <div className="fixed right-0 p-3 rounded-l-2xl  bottom-10 social-links flex flex-col gap-7 justify-end font-sans text-lg z-10 border-0" >
            < a className="fill-blue-accent h-5 w-5" aria-label='Github' href="https://github.com/EthanMerrill" id='github' data-tooltip-content="Github" data-tooltip-place="left" >
                <IconGithub />
            </a>
            < a className="fill-blue-accent h-5 w-5" aria-label='Linkedin' href="https://www.linkedin.com/in/ethanmerrill/" id='linkedin' data-tooltip-content="Linkedin" data-tooltip-place="left">
                <IconLinkedin />
            </a>
            < a className="fill-blue-accent h-5 w-5" aria-label='Printables' href="https://www.printables.com/social/89492-ethanmerrill/" id='printables' data-tooltip-content="Printables" data-tooltip-place="left">
                <IconPrinter />
            </a>
            < a className="fill-blue-accent h-5 w-5" aria-label='Hashnode' href="https://ethanmakes.hashnode.dev/" id='hashnode' data-tooltip-content="Hashnode" data-tooltip-place="left">
                <IconHashnode />
            </a>

        </div>
        <Tooltip className='z-50' anchorId='github' type="dark" effect="solid" />
        <Tooltip className='z-50' anchorId='hashnode' type="dark" effect="solid" />
        <Tooltip className='z-50' anchorId='linkedin' type="dark" effect="solid" />
        <Tooltip className='z-50' anchorId='printables' type="dark" effect="solid" />
    </>
    )
}

export default SocialLinks