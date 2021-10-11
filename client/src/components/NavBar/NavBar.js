import React, { useContext } from 'react'
import "./NavBar.css";
import { FcCompactCamera } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { AppContext } from "../../context/appContext";
import { UserAuthButton, LoggedInButton } from "../Buttons/Buttons";
import { logoutUser } from "../../api/api";
import { actionType } from "../../reducers/appReducer";

export const NavBar = () => {
    console.log("RENDER Navbar");
    const { appState, dispatch } = useContext(AppContext);


    const handleLogout = async () => {
        const response = await logoutUser()

        if (response.status === 200) {
            dispatch({
                type: actionType.LOGOUT
            })
            console.log("User logged out");
            localStorage.clear()
        } else {
            console.log("Error on logout");
            alert("Something went wrong")
        }
    }


    let userDropdown = (
        <div>
            <ul className="dropdown-menu">
                <Link to="/userdashboard" className="dropdown-link">
                    <li>Dashboard</li>
                </Link>
                {/* <Link to="/about" className="dropdown-link" > */}
                <li className="dropdown-item" onClick={handleLogout}>Logout</li>
                {/* </Link> */}

            </ul>
        </div>
    )

    if (!appState.userAuthenticated) {
        userDropdown = (<></>)
    }



    return (
        <>
            <nav className="navbar">
                <Link to="/" className="logo-link">
                    <div className="navbar-logo">
                        <h1>Photo Album</h1>
                        <FcCompactCamera size={45} />
                    </div>
                </Link>

                <ul className="nav-menu">
                    <Link to="/photoalbums" className="nav-link">
                        <li>Photos</li>
                    </Link>
                    <Link to="/about" className="nav-link">
                        <li>About</li>
                    </Link>
                    <Link to="/contact" className="nav-link">
                        <li>Contact</li>
                    </Link>
                </ul>

                <div className="nav-user">
                    {appState.userAuthenticated ? <LoggedInButton /> : <UserAuthButton />}
                </div>
            </nav>

            <div >
                {appState.userAuthenticated ? userDropdown : ""}
            </div>
        </>

    )
}

export default NavBar
