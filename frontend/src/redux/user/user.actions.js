export const setCurrentUsername = token => ({
    type: "SET_CURRENT_USERNAME",
    payload: token
});

export const setCurrentUser = user => ({
    type: "SET_CURRENT_USER",
    payload: user
});

export const logOut = () => ({
    type: "LOG_OUT"
});
