import React, { useContext } from 'react'
import "./NavBar.css";
import { FcCompactCamera } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { AppContext } from "../../context/appContext";
import { UserAuthButton, LoggedInButton } from "../Buttons/Buttons";

export const NavBar = () => {
    console.log("RENDER Navbar");
    const { appState } = useContext(AppContext);

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
                    <Link to="/photogallery" className="nav-link">
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
        </>

    )
}

export default NavBar
