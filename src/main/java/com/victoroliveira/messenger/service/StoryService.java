package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.models.Story;

import java.util.List;

public interface StoryService {
    Story createStory(Story story, String username);
    void deleteStory(long id, String username);
    List<Story> allStoriesOfSomeone(String username);
}
