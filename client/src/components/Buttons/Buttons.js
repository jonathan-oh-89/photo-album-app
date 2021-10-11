import React, { useContext } from 'react'
import "./Buttons.css";
import { AppContext } from "../../context/appContext";
import { BiUserCircle } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { actionType } from "../../reducers/appReducer";



export const UserAuthButton = ({ text }) => {
    const { dispatch } = useContext(AppContext);

    const handleClick = () => {
        dispatch({
            type: actionType.TOGGLE_AUTH_FORM,
            showAuthForm: true
        })
    }

    if (!text) {
        text = "Sign Up"
    }

    return (
        <>
            <button className="sign-button" onClick={handleClick}>{text}</button>
        </>
    )
}


export const LoggedInButton = () => {
    const { appState } = useContext(AppContext);

    // const history = useHistory();

    // function handleClick() {
    //     history.push("/photoalbum");
    // }

    return (
        <button className="loggedin-button">
            Welcome, {appState.user.username}
            <BiUserCircle size={20} />
        </button>
    )
}
