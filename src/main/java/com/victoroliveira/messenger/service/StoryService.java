package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.models.Story;

import java.util.List;

public interface StoryService {
    Story createStory(Story story);
    void deleteStory(Story story);
    List<Story> allStoriesOfSomeone(Profile profile);
}
