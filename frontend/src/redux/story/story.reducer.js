const INITIAL_STATE = {
    stories: [],
    selectedContact: null,
    selectedContactRef: null,
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
        case "SET_SELECTED_CONTACT":
            return {
                ...state,
                selectedContact: action.payload
            };
        case "SET_SELECTED_CONTACT_REF":
            return {
                ...state,
                selectedContactRef: action.payload
            };
        default:
            return state;
    }
};

export default storyReducer;
