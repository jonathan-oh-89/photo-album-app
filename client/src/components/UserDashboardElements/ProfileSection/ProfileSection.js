
import React, { useContext } from 'react'
import Avatar from 'react-avatar';
import "./ProfileSection.css";
import { AppContext } from "../../../context/appContext";

export const ProfileSection = () => {
    const { appState } = useContext(AppContext)

    return (
        <div className="profile-section-container">
            <div className="profile-section">
                <div className="profile-header">
                    <Avatar className="profile-image" name="Fff" size={150} />
                    <h1>{appState.user.username}</h1>
                </div>
                <div className="profile-content">
                    <h2>Your Name<span>Designation</span></h2>

                </div>
            </div>
        </div>
    )
}