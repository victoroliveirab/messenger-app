const INITIAL_STATE = {
    token: null,
    user: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            console.log("SET_TOKEN");
            return {
                ...state,
                token: action.payload
            };
        case "SET_USER":
            console.log("SET_USER");
            return {
                ...state,
                user: action.payload
            };
        case "LOG_OUT":
            return {
                ...state,
                token: null,
                user: null
            };
        default:
            return state;
    }
};

export default userReducer;
