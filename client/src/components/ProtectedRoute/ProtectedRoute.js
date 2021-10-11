import React, { useContext } from 'react'
import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { actionType } from "../../reducers/appReducer";


const ProtectedRoute = ({ component: Component }) => {
    const { appState, dispatch } = useContext(AppContext);

    // const localStorageData = localStorage.getItem("photoalbum")
    // const isAuthenticated = localStorageData.userAuthenticated;

    return (
        <Route
            render={() =>
                appState.isAuthenticated ? <Component /> : <Redirect to="/" />
            }
        />
    )
}

export default ProtectedRoute;
