const INITIAL_STATE = {
    stories: [],
    selectedContact: null,
    selectedContactRef: null,
    currentStory: null,
    createNewStory: false,
    ownStories: []
};

const storyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_STORY_LIST":
            return {
                ...state,
                stories: action.payload
            };
        case "SET_OWN_STORIES":
            console.log(action.payload);
            return {
                ...state,
                ownStories: action.payload
            };
        case "APPEND_OWN_STORIES":
            const newOwnStories = state.ownStories.concat([action.payload]);
            return {
                ...state,
                ownStories: newOwnStories
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
        case "SET_CREATE_NEW_STORY":
            if (state.selectedContactRef)
                state.selectedContactRef.classList.remove("contact__selected");
            return {
                ...state,
                selectedContact: null,
                selectedContactRef: null,
                currentStory: null,
                createNewStory: true
            };
        case "UNSET_CREATE_NEW_STORY":
            return {
                ...state,
                createNewStory: false
            };
        default:
            return state;
    }
};

export default storyReducer;
