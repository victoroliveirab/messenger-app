import Cookies from "js-cookie";

const rememberMeParsed = Cookies.get("rememberPitang") === "true";

const INITIAL_STATE = {
    rememberMe: rememberMeParsed,
    token: null,
    user: null
};

INITIAL_STATE.token = INITIAL_STATE.rememberMe && Cookies.get("jwtPitang");

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_REMEMBER_ME":
            Cookies.set("rememberPitang", action.payload);
            return {
                ...state,
                rememberMe: action.payload
            };
        case "SET_TOKEN":
            Cookies.set("jwtPitang", action.payload);
            return {
                ...state,
                token: action.payload
            };
        case "SET_USER":
            return {
                ...state,
                user: action.payload
            };
        case "LOG_OUT":
            Cookies.remove("jwtPitang");
            Cookies.remove("rememberPitang");
            return {
                ...state,
                token: null,
                user: null,
                rememberMe: false
            };
        default:
            return state;
    }
};

export default userReducer;
