export const setStoryList = storyList => ({
    type: "SET_STORY_LIST",
    payload: storyList
});

export const setCurrentStory = story => ({
    type: "SET_CURRENT_STORY",
    payload: story
});
