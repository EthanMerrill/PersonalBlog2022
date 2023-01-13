import React, { useEffect, useState } from "react";

const SocialLinks = (props) => {
    // JSX return
    return(
        <div className="absolute right-max-20 pr-10 pl-10 bottom-10 social-links flex flex-row gap-10 justify-end font-sans text-lg ">
            <a className="hover:underline" href="https://www.linkedin.com/in/ethanmerrill/"> 💼 Linkedin</a>
            <a className="hover:underline" href="https://github.com/EthanMerrill"> 🐙 Github</a>
            <a className="hover:underline" href="https://www.printables.com/social/89492-ethanmerrill/"> 🖨️ Printables</a>
        </div>
    )
}

export default SocialLinks