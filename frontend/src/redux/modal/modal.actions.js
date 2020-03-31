export const toggleShow = () => ({
    type: "TOGGLE_SHOW"
});

export const setType = type => ({
    type: "SET_TYPE",
    payload: type
});

export const setOptions = options => ({
    type: "SET_OPTIONS",
    payload: options
});

export const resetModal = () => ({
    type: "RESET_MODAL"
});
