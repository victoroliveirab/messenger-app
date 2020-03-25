export const setToken = token => ({
    type: "SET_TOKEN",
    payload: token
});

export const setUser = user => ({
    type: "SET_USER",
    payload: user
});

export const logout = () => ({
    type: "LOG_OUT"
});
