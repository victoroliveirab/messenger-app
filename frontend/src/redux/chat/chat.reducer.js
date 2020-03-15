const INITIAL_STATE = {
    messages: []
};

const chat = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_MESSAGES":
            return {
                ...state,
                messages: action.payload
            };
        case "APPEND_MESSAGE":
            const arr = state.messages.concat([action.payload]);
            return {
                ...state,
                messages: arr
            };
        default:
            return state;
    }
};

export default chat;
