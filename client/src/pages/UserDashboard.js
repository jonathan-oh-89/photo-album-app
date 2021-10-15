import React from 'react'
import { ProfileSection } from "../components/UserDashboardElements/ProfileSection/ProfileSection";
import { ProfileAlbumSection } from "../components/UserDashboardElements/ProfileAlbumSection/ProfileAlbumSection";

const UserDashboard = () => {
    return (
        <div className="user-dashboard">
            <ProfileSection />
            <ProfileAlbumSection />
        </div>
    )
}

export default UserDashboard

