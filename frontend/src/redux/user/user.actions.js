export const getUser = () => ({
    type: "GET_USER"
});

export const setCurrentUser = token => ({
    type: "SET_CURRENT_USER",
    payload: token
});

export const logOut = () => ({
    type: "LOG_OUT"
});
