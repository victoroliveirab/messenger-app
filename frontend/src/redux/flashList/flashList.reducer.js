const INITIAL_STATE = {
    flashes: []
};

const flashList = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_FLASH":
            const largerFlashes = state.flashes.concat([action.payload]);
            return {
                ...state,
                flashes: largerFlashes
            };
        case "REMOVE_FLASH":
            const index = state.flashes.findIndex(
                flash => flash.message === action.payload
            );
            const tinierFlashes = state.flashes
                .slice(0, index)
                .concat(state.flashes.slice(index + 1));
            return {
                ...state,
                flashes: tinierFlashes
            };
        default:
            return state;
    }
};

export default flashList;
