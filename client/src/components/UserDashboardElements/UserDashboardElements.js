import React from 'react'
import "./UserDashboardElements.css";
import DragAndDrop from "./DragAndDrop/DragAndDrop";
import Avatar from 'react-avatar';

export const ProfileHeader = () => {
    return (
        <div className="profile-header">
            <Avatar className="profile-image" name="Fff" size={150} />
            <h1>Name</h1>
        </div>
    )
}

export const ProfileSection = () => {
    return (
        <div className="profile-section">
            <ProfileHeader />
            ProfileSection
        </div>
    )
}

export const ProfileAlbumSection = () => {
    return (
        <div className="profile-album-section">
            <h1>Photo Album</h1>
            <DragAndDrop />
        </div>
    )
}