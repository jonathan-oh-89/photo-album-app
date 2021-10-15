import React, { useCallback, useState, useContext } from 'react'
import { useDropzone } from "react-dropzone";
import { BiImage } from "react-icons/bi";
import "./DragAndDrop.css";
import { uploadPhotosApi } from "../../../api/api";
import { AppContext } from "../../../context/appContext";
import { actionType } from '../../../reducers/appReducer';

const DragAndDrop = () => {
    console.log("Render DragAndDrop");
    const { appState, dispatch } = useContext(AppContext);
    const [files, setFiles] = useState([]);
    const [showUpload, setShowUpload] = useState(false);

    const onDrop = useCallback(acceptedFiles => {

        if (acceptedFiles.length > 0) {
            setShowUpload(true)
        }

        setFiles(
            acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        )

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
    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({ onDrop, accept: 'image/jpeg, image/png' })



    const dragDropSection = (
        <div className="drag-files-section">
            <BiImage size={50} />
            <input {...getInputProps()} />
            {
                isDragActive ? isDragReject ? <p style={{ color: "red" }}>Only jpeg and png files are allowed</p> :
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )


    const handleUpload = async () => {
        const newImgIdArray = await uploadPhotosApi(files, appState.user)
        const updatedAlbum = appState.user.album.concat(newImgIdArray)

        dispatch({
            type: actionType.UPDATE_ALBUM,
            updatedAlbum: updatedAlbum
        })

        setFiles([])
        setShowUpload(false)
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
