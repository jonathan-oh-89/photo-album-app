import React, { useContext, useState } from 'react'
import './SignUpForm.css'
import useInputState from "../../hooks/useInputState";
import { AppContext } from "../../context/appContext";
import { UserAuthButton } from "../Buttons/Buttons";
import { actionType } from "../../reducers/appReducer";
import { AiOutlineClose } from "react-icons/ai";
import { signUpUser, logUserIn } from "../../api/api";
import { useHistory } from "react-router-dom";


export const SignUpForm = () => {
    console.log("RENDERING SIGNUP FORM");
    const { appState, dispatch } = useContext(AppContext);
    const [userSignUp, toggleAuthType] = useState(true);
    const [usernameSubmit, handleUserNameChange, resetUserName] = useInputState(appState.user.username)
    const [passwordSubmit, handlePasswordChange, resetPassword] = useInputState(appState.user.password)
    const history = useHistory();

    const closeForm = () => {
        dispatch({
            type: actionType.TOGGLE_AUTH_FORM,
            showAuthForm: false
        })
    }

    const handleSignUp = (e) => {
        e.preventDefault();

        const submitData = {
            username: usernameSubmit,
            password: passwordSubmit,
        }

        signUpUser(submitData)

        resetUserName();
        resetPassword();
    }


    const handleLogIn = async (e) => {
        e.preventDefault();

        resetUserName();
        resetPassword();

        const submitData = {
            username: usernameSubmit,
            password: passwordSubmit,
        }

        console.log("Submitting login data: ", usernameSubmit, passwordSubmit);

        const response = await logUserIn(submitData);

        console.log("got response:", response);

        // if (response.status === 200) {
        //     console.log("dispatching login success and rerouting to photoalbum");
        //     dispatch({
        //         type: actionType.LOGIN_SUCCESS,
        //         username: usernameSubmit
        //     })
        //     history.push('/photoalbum')
        // } else {
        //     console.log("ERROR", response);
        // }
    }


    const changeAuthForm = () => {
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
                            <UserAuthButton text={buttonText} />
                            <p onClick={changeAuthForm}>{userSignUp ? "Already signed up?" : "Not registered?"}</p>
                        </form>
                    </div>
                </div>
            )
            : ""
    )
}

export default SignUpForm
