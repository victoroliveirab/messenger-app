package com.victoroliveira.messenger.service.impl;

import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.models.Story;
import com.victoroliveira.messenger.repository.StoryRepository;
import com.victoroliveira.messenger.service.ProfileService;
import com.victoroliveira.messenger.service.StoryService;

import java.util.List;

public class StoryServiceImpl implements StoryService {

    private ProfileService profileService;
    private StoryRepository storyRepository;

    public StoryServiceImpl(ProfileService profileService, StoryRepository storyRepository) {
        this.profileService = profileService;
        this.storyRepository = storyRepository;
    }

    @Override
    public Story createStory(Story story) {
        return storyRepository.save(story);
    }

    @Override
    public void deleteStory(Story story) {
        storyRepository.delete(story);
    }

    @Override
    public List<Story> allStoriesOfSomeone(Profile profile) {
        return storyRepository.findAllByProfile(profile);
    }
}
