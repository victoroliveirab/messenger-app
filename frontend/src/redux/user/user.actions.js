export const setToken = token => ({
    type: "SET_TOKEN",
    payload: token
});

export const setUser = user => ({
    type: "SET_USER",
    payload: user
});

export const setRememberMe = remember => ({
    type: "SET_REMEMBER_ME",
    payload: remember
});

export const logout = () => ({
    type: "LOG_OUT"
});
