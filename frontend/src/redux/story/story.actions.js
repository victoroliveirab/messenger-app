export const setStoryList = storyList => ({
    type: "SET_STORY_LIST",
    payload: storyList
});

export const setCurrentStory = story => ({
    type: "SET_CURRENT_STORY",
    payload: story
});

export const setSelectedContact = contact => ({
    type: "SET_SELECTED_CONTACT",
    payload: contact
});

export const setSelectedContactRef = contactRef => ({
    type: "SET_SELECTED_CONTACT_REF",
    payload: contactRef
});

export const setCreateNewStory = () => ({
    type: "SET_CREATE_NEW_STORY"
});

export const unsetCreateNewStory = () => ({
    type: "UNSET_CREATE_NEW_STORY"
});
