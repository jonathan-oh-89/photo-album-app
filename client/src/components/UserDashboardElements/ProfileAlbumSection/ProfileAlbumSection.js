import React, { useEffect, useContext, useState } from 'react'
import "./ProfileAlbumSection.css";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import { deletePhotosApi, retrievePhotosApi } from "../../../api/api";
import { AppContext } from "../../../context/appContext";
import { AiOutlineClose } from "react-icons/ai";
import { actionType } from '../../../reducers/appReducer';

export const ProfileAlbumSection = () => {
    console.log("Rendering ProfileAlbumSection");

    const [userPhotos, setUserPhotos] = useState()
    const { appState, dispatch } = useContext(AppContext)

    useEffect(() => {
        const getPhotos = async () => {
            const retrievedPhotos = await retrievePhotosApi(appState.user);
            setUserPhotos(retrievedPhotos);
        }

        getPhotos();
    }, [appState.user]);

    const handleDeleteImg = async (imageid) => {
        await deletePhotosApi(appState.user, imageid);
        const updatedAlbum = appState.user.album.filter(img => img.imageid !== imageid)
        dispatch({
            type: actionType.UPDATE_ALBUM,
            updatedAlbum: updatedAlbum
        })

    }

    const ImageComponent = ({ img }) => {
        return (
            <div className="album-images">
                <AiOutlineClose className="album-image-close" onClick={() => handleDeleteImg(img.imageid)} />
                <img
                    src={img.url}
                    width="400"
                    height="500"
                    alt="" />
            </div>
        )
    }

    return (
        <div>
            <div className="profile-album-section">
                <h1>Add Photos</h1>
                <DragAndDrop />

                <div className="">
                    <h1>Photo Album</h1>
                    {/* <AlbumImages /> */}

                    <div>
                        {userPhotos === undefined ?
                            <>Still loading...</>
                            :
                            userPhotos.map((img, i) =>
                                <ImageComponent img={img} key={img.imageid} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
