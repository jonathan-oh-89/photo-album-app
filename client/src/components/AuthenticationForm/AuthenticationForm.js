import React, { useContext, useState } from 'react'
import './AuthenticationForm.css'
import useInputState from "../../hooks/useInputState";
import { AppContext } from "../../context/appContext";
import { UserAuthButton } from "../Buttons/Buttons";
import { actionType } from "../../reducers/appReducer";
import { AiOutlineClose } from "react-icons/ai";
import { signUpUser, logUserIn } from "../../api/api";
import { useHistory } from "react-router-dom";


export const AuthenticationForm = () => {
    console.log("RENDERING SIGNUP FORM");
    const { appState, dispatch } = useContext(AppContext);
    const [userSignUp, toggleAuthType] = useState(true);
    const [failedLogin, showFailedAuthMsg] = useState(false);
    const [failedAuthMsg, setFailedAuthMsg] = useState(false);
    const [usernameSubmit, handleUserNameChange, resetUserName] = useInputState("")
    const [passwordSubmit, handlePasswordChange, resetPassword] = useInputState("")
    const history = useHistory();

    const closeForm = () => {
        showFailedAuthMsg(false)
        resetUserName()
        resetPassword()
        dispatch({
            type: actionType.TOGGLE_AUTH_FORM,
            showAuthForm: false
        })
    }

    const inputValidation = (type, inputText) => {
        if (type === 'value' && inputText.length > 0) {
            return true;
        }
        if (type === 'username' && inputText.match(/^[0-9a-zA-Z_]+$/)) {
            return true;
        }
        if (type === 'password' && !inputText.match(/(\s)/)) {
            return true;
        }

        return false;

    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!inputValidation("value", usernameSubmit)) {
            setFailedAuthMsg("Please enter your username")
            showFailedAuthMsg(true)
            return
        }
        if (!inputValidation("value", passwordSubmit)) {
            setFailedAuthMsg("Please enter your password")
            showFailedAuthMsg(true)
            return
        }


        if (!inputValidation("username", usernameSubmit)) {
            setFailedAuthMsg("Please only use Alphanumeric or \"_\" for username")
            showFailedAuthMsg(true)
            return
        }
        if (!inputValidation("password", passwordSubmit)) {
            setFailedAuthMsg("Please do not include space in password")
            showFailedAuthMsg(true)
            return
        }

        const submitData = {
            username: usernameSubmit,
            password: passwordSubmit,
        }

        const response = await signUpUser(submitData)
        const respJson = await response.json();

        console.log("Sign Up response: ", respJson);

        if (response.status === 200) {
            console.log("dispatching signup success and rerouting to userdashboard");
            dispatch({
                type: actionType.SIGNUP,
                _id: respJson._id,
                username: respJson.username
            })
            showFailedAuthMsg(false)
            history.push('/userdashboard')
        } else {
            setFailedAuthMsg(respJson.message)
            showFailedAuthMsg(true)
        }

        resetUserName();
        resetPassword();
    }


    const handleLogIn = async (e) => {
        e.preventDefault();

        const submitData = {
            username: usernameSubmit,
            password: passwordSubmit,
        }

        const response = await logUserIn(submitData);
        const respJson = await response.json();
        console.log("Login response: ", respJson);


        if (response.status === 200) {
            console.log("dispatching login success and rerouting to userdashboard");
            dispatch({
                type: actionType.LOGIN_SUCCESS,
                _id: respJson._id,
                username: respJson.username,
                useralbum: respJson.album
            })
            showFailedAuthMsg(false)
            history.push('/userdashboard')
        } else {
            setFailedAuthMsg(respJson.message)
            showFailedAuthMsg(true)
        }

        resetUserName();
        resetPassword();
    }

    const changeAuthForm = () => {
        showFailedAuthMsg(false)
        toggleAuthType(!userSignUp)
    }

    const buttonText = userSignUp ? "Sign Up" : "Log In"

    return (
        appState.showAuthForm ?
            (
                <div className="form-container" onClick={closeForm}>
                    <div className="form" onClick={e => e.stopPropagation()}>
                        <AiOutlineClose className="close" onClick={closeForm} />
                        <form onSubmit={userSignUp ? handleSignUp : handleLogIn} >
                            <div className="form-header-text">
                                <h1>{userSignUp ? "Sign Up" : "Log In"}</h1>
                            </div>

                            <div>
                                <input className="text-form" placeholder="Username" type="text" value={usernameSubmit} onChange={handleUserNameChange} />
                            </div>
                            <div>
                                <input className="text-form" placeholder="Password" type="text" value={passwordSubmit} onChange={handlePasswordChange} />
                            </div>

                            <div>{failedLogin ? <p className="error-message">{failedAuthMsg}</p> : ""}</div>


                            <UserAuthButton text={buttonText} />
                            <p className="switch-auth-type" onClick={changeAuthForm}>{userSignUp ? "Already signed up?" : "Not registered?"}</p>
                        </form>
                    </div>
                </div>
            )
            : ""
    )
}

export default AuthenticationForm
