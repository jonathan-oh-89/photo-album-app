import React from 'react'
import heroimage2 from '../../assets/heroimage2.png';
import "./HeroSection.css";

export const HeroSection2 = () => {
    console.log("Rendering HeroSection2");
    return (
        <div className="hero-section">
            <img className="hero-image-2" src={heroimage2} alt="heroimage2" />
            <div className="hero-text-section">
                <h1>Share Your Photos </h1>
                <h2>Share your favorite photos with other users.
                </h2>
            </div>
        </div>
    )
}

export default HeroSection2
