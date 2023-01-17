import {useRef } from "react";

export default function PhotoCarousel(props) {
    const images = props.images
    const {hover} = props
    const {showPhotos} = props

    //ref
    const theRef = useRef();
    return (
        <div ref = {theRef} className={showPhotos ? "carousel-container unstacked" : "carousel-container stacked"+((!hover&&!showPhotos) ? "":" hover")}>
    <div className="imc">
    {images &&
        images.map((e, i) => {
            for (var key in e) {
                return (
                    <div key = {i} className={"card-image image-" + i}>
                        <img className={"image-"} key={i} src={e} alt={key}></img>
                    </div>
                )
            }
        })
    }
</div>
</div>
)
}
