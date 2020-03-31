const INITIAL_STATE = {
    show: false,
    type: null,
    options: null
};

const modalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "TOGGLE_SHOW":
            const toggle = !state.show;
            return {
                ...state,
                show: toggle
            };
        case "SET_TYPE":
            return {
                ...state,
                type: action.payload
            };
        case "SET_OPTIONS":
            return {
                ...state,
                options: action.payload
            };
        case "RESET_MODAL":
            return {
                ...state,
                type: null,
                options: null
            };
        default:
            return state;
    }
};

export default modalReducer;
