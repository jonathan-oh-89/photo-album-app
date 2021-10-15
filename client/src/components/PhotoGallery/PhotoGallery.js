import React, { useState, useEffect } from 'react'
import "./PhotoGallery.css";
import { retrieveAllPhotosApi } from "../../api/api";
import { ImageModal } from "./ImageModal";

export const PhotoGallery = () => {
    console.log("Rendering PhotoGallery");
    const [allUserImages, setAllUserImages] = useState([])

    useEffect(() => {
        console.log("useEffect - loading all user images");
        const getAllImages = async () => {
            const allImages = await retrieveAllPhotosApi()
            setAllUserImages(allImages)
        }
        getAllImages()
    }, [])

    const [showImageModal, toggleImageModal] = useState(false)
    const [imageData, setImageData] = useState({})

    const handleImageClick = ({ username, imageid, url }) => {
        console.log("handleImageClick data: ", username);
        toggleImageModal(true)
        setImageData({ username, imageid, url })
    }

    const ImageComponent = ({ username, imageid, url }) => {
        return (
            <div className="images">
                <img
                    src={url}
                    alt=""
                    onClick={() => handleImageClick({ username, imageid, url })}
                />
            </div>
        )
    }

    return (
        <div className="gallery-container">
            <div> <h1>Photo Gallery</h1></div>
            <article>
                {allUserImages.map((img, i) =>
                    <section>
                        <div>
                            <ImageComponent username={img.username} imageid={img.imageid} url={img.url} />
                        </div>
                    </section>
                )}
            </article>
            {showImageModal ? <ImageModal data={imageData} toggleImageModal={toggleImageModal} /> : ""}
        </div>
    )
}
