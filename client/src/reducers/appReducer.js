
export const actionType = {
    SIGNUP: "SIGNUP",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    TOGGLE_AUTH_FORM: "TOGGLE_AUTH_FORM",
    LOGOUT: "LOGOUT"
}

export default function reducer(state, action) {
    switch (action.type) {
        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                showAuthForm: false,
                userAuthenticated: true,
                user: {
                    username: action.username,
                }
            };
        case actionType.TOGGLE_AUTH_FORM:
            return {
                ...state,
                showAuthForm: action.showAuthForm
            }
        case actionType.SIGNUP:
            return {
                ...state,
                showAuthForm: false,
                userAuthenticated: false,
                user: {
                    username: "",
                    password: "",
                }
            };
        case actionType.LOGOUT:
            return {
                ...state,
                showAuthForm: false,
                userAuthenticated: false,
                user: {
                    username: "",
                    password: "",
                }
            };
        default:
            return state;
    }
}

