const INITIAL_STATE = {
    auth: sessionStorage.getItem("pitangAuth"),
    username: sessionStorage.getItem("pitangUsername")
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CURRENT_USER":
            console.log("setCurrentUser");
            return {
                ...state,
                auth: action.payload.auth,
                username: action.payload.username
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
