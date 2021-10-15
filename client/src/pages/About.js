import React from 'react'
import './About.css'

const About = () => {
    return (
        <div className="about-page">
            <h1>About This App</h1>

            <h2>Technologies Used</h2>
            <div className="tech-images">
                <img src={require("../assets/about/react-logo.png").default} alt="redux logo" />
                <img src={require("../assets/about/nodejs-logo.png").default} alt="express logo" />
                <img src={require("../assets/about/express-logo.png").default} alt="express logo" />
                <img src={require("../assets/about/passport-logo.png").default} alt="express logo" />
                <img src={require("../assets/about/cloudinary-logo.png").default} alt="express logo" />
            </div>

            <h2>What this app does</h2>
            <p>Users can sign up for an account via sign up form by providing a username and password. After signing up, the user can upload image files through the user dashboard.
                Users can either click the upload button or drag and drop image files. Images are upload to the cloudinary cloud storage. Users have the option for deleting images
                from their account. To view all the images uploaded by all users, simple go the the Photos page.
                User authentication is handled with Passportjs using the local strategy.
                User sessions are created and managed through the Express framework.

            </p>
        </div>
    )
}

export default About
