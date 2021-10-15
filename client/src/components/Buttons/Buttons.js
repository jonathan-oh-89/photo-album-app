import React, { useContext } from 'react'
import "./Buttons.css";
import { AppContext } from "../../context/appContext";
import { BiUserCircle } from "react-icons/bi";
import { actionType } from "../../reducers/appReducer";
import { Link } from 'react-router-dom';
import { logoutUser } from "../../api/api";
import { useHistory } from "react-router-dom";



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
    const history = useHistory();
    const { appState, dispatch } = useContext(AppContext);

    const handleLogout = async () => {
        const response = await logoutUser()

        if (response.status === 200) {
            dispatch({
                type: actionType.LOGOUT
            })
            console.log("User logged out");
            localStorage.clear()
            history.push('/')
        } else {
            console.log("Error on logout");
            alert("Something went wrong")
        }
    }

    let userDropdown = (
        <ul className="dropdown-content">
            <Link to="/userdashboard" className="dropdown-link" style={{ textDecoration: 'none' }}>
                <li>Dashboard</li>
            </Link>
            <li className="dropdown-item" onClick={handleLogout}>Logout</li>
        </ul>
    )

    if (!appState.userAuthenticated) {
        userDropdown = (<></>)
    }

    return (
        <div className="user-dropdown">
            <button className="loggedin-button">
                <p>Welcome, {appState.user.username}</p>
                <BiUserCircle className="loggedin-icon" size={25} />
            </button>
            {userDropdown}
        </div>

    )
}
