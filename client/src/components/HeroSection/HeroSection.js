import React, { useContext } from 'react'
import heroimage from '../../assets/heroimage.png';
import "./HeroSection.css";
import { UserAuthButton } from "../Buttons/Buttons";
import { AppContext } from "../../context/appContext";

export const HeroSection = () => {
    console.log("Rendering HeroSection");
    const { appState } = useContext(AppContext);

    return (
        <div className="hero-section">
            <div className="hero-text-section">
                <h1>Free storage for your photos</h1>
                <h2>Upload photos, save to profile, and share with friends.
                    A hassle free way to upload images in a safe, secure place.
                </h2>
                {appState.userAuthenticated ? "" : <UserAuthButton />}

            </div>
            <img className="hero-image-1" src={heroimage} alt="heroimage" />
        </div>
    )
}

export default HeroSection
