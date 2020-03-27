const axios = require("axios");

const config = token => ({
    headers: {
        "Content-Type": "application/json",
        Authorization: token
    }
});

export const dispatchGet = (path, token) => {
    return axios.get(path, config(token));
};

export const dispatchPost = (path, body, token) => {
    return axios.post(path, body, config(token));
};
