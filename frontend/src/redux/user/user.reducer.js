const INITIAL_STATE = {
    auth: sessionStorage.getItem("pitangAuth"),
    username: sessionStorage.getItem("pitangUsername"),
    user: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CURRENT_USERNAME":
            return {
                ...state,
                auth: action.payload.auth,
                username: action.payload.username
            };
        case "SET_CURRENT_USER":
            return {
                ...state,
                user: action.payload
            };
        case "LOG_OUT":
            return {
                ...state,
                auth: null,
                username: null
            };
        default:
            return state;
    }
};

export default userReducer;
