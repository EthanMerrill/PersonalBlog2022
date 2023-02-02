import IconExternal from "../Icons/IconExternal.tsx"

export default function CardButton(props) {
    const { buttonText, buttonLink } = props
    return (
        <div className="absolute bottom-0 right-0 bg-main-text-gray p-2 rounded-tl-2xl rounded-br-2xl hover:bg-yellow">
           
            <a href={buttonLink} target="_blank" rel="noreferrer">
            <div className="flex flex-row gap-2 items-center justify-center">
                <p className="text-white">
                    {buttonText}
                </p>
                <div className="z-3 h-6 w-6 fill-green">
                <IconExternal/>
                </div>
                </div>
            </a>

        </div>
    )
}