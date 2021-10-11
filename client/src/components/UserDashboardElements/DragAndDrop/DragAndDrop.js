import React, { useCallback, useState } from 'react'
import { useDropzone } from "react-dropzone";
import { BiImage } from "react-icons/bi";
import "./DragAndDrop.css";
import { uploadPhotosApi } from "../../../api/api";

function DragAndDrop() {
    const [files, setFiles] = useState([]);
    const [showUpload, setShowUpload] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(
            acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        )
        setShowUpload(true)
    }, [])

    const thumbs = files.map(file => (
        <div className="thumb" key={file.name}>
            <div className="thumbInner">
                <img
                    src={file.preview}
                    className="img"
                    alt="thumb"
                />
            </div>
        </div>
    ));

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/jpeg, image/png' })


    const dragDropSection = (
        <div className="drag-files-section">
            <BiImage size={50} />
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )

    function handleUpload() {
        uploadPhotosApi(files)
    }

    const uploadPhotoSection = (
        <>
            {isDragActive ?
                dragDropSection
                :
                <button className="upload-button" onClick={handleUpload}>
                    Upload Photos
                </button>}
        </>
    )


    return (
        <div className="photo-upload-container">
            <div {...getRootProps()} className="photo-upload-inner-container">
                {showUpload ? uploadPhotoSection : dragDropSection}
            </div>
            <aside className="thumbsContainer">
                {thumbs}
            </aside>
        </div>

    )
}

export default DragAndDrop
