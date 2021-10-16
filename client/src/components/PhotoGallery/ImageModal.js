import React from 'react'
import "./ImageModal.css";


export const ImageModal = ({ data, toggleImageModal }) => {
    console.log("Rendering ImageModal");

    const closeImageModal = () => {
        toggleImageModal(false)
    }

    return (
        <div className="image-modal-container" onClick={closeImageModal}>
            <div className="image-modal">
                <img src={data.url} alt="" />
                <div className="image-modal-text">Photo uploaded by {data.username}</div>
            </div>
        </div>
    )
}
