import React, { useContext } from 'react'
import { ProfileSection, ProfileAlbumSection } from "../components/UserDashboardElements/UserDashboardElements";
import { actionType } from "../reducers/appReducer";
import { AppContext } from "../context/appContext";


const UserDashboard = () => {
    const { appState, dispatch } = useContext(AppContext);



    return (
        <div className="profile-dashboard">
            <ProfileSection />
            <ProfileAlbumSection />
        </div>
    )
}

export default UserDashboard

