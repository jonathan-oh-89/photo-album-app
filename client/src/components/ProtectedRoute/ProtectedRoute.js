import React, { useContext } from 'react'
import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../../context/appContext";


const ProtectedRoute = ({ component: Component, ...rest }) => {
    console.log("Rendering ProtectedRoute");
    const { appState } = useContext(AppContext);

    return (
        <Route
            {...rest}
            render={() =>
                appState.userAuthenticated ? <Component /> : <Redirect to="/" />
            }
        />
    )
}

export default ProtectedRoute;
