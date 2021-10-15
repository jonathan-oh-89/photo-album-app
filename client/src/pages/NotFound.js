import React from 'react'
import './NotFound.css'

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="not-found-icon">
                <img src={require("../assets/404.png").default} alt="" />
            </div>
            <div className="not-found-text">
                <h1>404</h1>
                <h2>Ooops!</h2>
                <h3>We can't seem to find the page you're looking for.</h3>
            </div>
        </div>
    )
}

export default NotFound