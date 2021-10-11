import React, { createContext, useReducer } from 'react'
import userReducer from "../reducers/appReducer";
import { useLocalStorageReducer } from "../hooks/useLocalStorageReducer";

export const AppContext = createContext();

const defaultState = {
    showAuthForm: false,
    userAuthenticated: false,
    user: {
        username: "",
        password: "",
    }
}


export const AppProvider = (props) => {
    const [appState, dispatch] = useLocalStorageReducer("photoalbum", userReducer, defaultState)

    return (
        <AppContext.Provider value={{ appState, dispatch }}>
            {props.children}
        </AppContext.Provider>
    )
}
