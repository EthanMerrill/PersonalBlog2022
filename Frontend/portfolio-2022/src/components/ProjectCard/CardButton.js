export default function CardButton(props) {
    const { buttonText, buttonLink } = props
    return (
        <div className="absolute bottom-0 right-0 bg-main-text-gray p-2 rounded-tl-2xl rounded-br-2xl hover:bg-yellow">
            <a href={buttonLink} target="_blank" rel="noreferrer">
                <p className="text-white">
                    {buttonText}
                </p>
            </a>
        </div>
    )
}