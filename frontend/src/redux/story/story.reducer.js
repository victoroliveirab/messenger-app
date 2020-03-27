const INITIAL_STATE = {
    stories: [],
    currentStory: null
};

const storyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_STORY_LIST":
            return {
                ...state,
                stories: action.payload
            };
        case "SET_CURRENT_STORY":
            return {
                ...state,
                currentStory: action.payload
            };
        default:
            return state;
    }
};

export default storyReducer;
