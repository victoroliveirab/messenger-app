import Cookies from "js-cookie";

const INITIAL_STATE = {
    token: Cookies.get("jwtPitang"),
    user: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            Cookies.set("jwtPitang", action.payload);
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
            Cookies.remove("jwtPitang");
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
