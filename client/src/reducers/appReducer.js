
export const actionType = {
    SIGNUP: "SIGNUP",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    TOGGLE_AUTH_FORM: "TOGGLE_AUTH_FORM",
    LOGOUT: "LOGOUT",
    UPDATE_ALBUM: "UPDATE_ALBUM"
}

export default function reducer(state, action) {
    switch (action.type) {
        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                showAuthForm: false,
                userAuthenticated: true,
                user: {
                    _id: action._id,
                    username: action.username,
                    album: action.useralbum
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
                userAuthenticated: true,
                user: {
                    _id: action._id,
                    username: action.username,
                    album: []
                }
            };
        case actionType.LOGOUT:
            return {
                ...state,
                showAuthForm: false,
                userAuthenticated: false,
                user: {
                    _id: "",
                    username: "",
                    album: ""
                }
            };
        case actionType.UPDATE_ALBUM:
            return {
                ...state,
                user: {
                    ...state.user,
                    album: action.updatedAlbum
                }
            };
        default:
            return state;
    }
}

