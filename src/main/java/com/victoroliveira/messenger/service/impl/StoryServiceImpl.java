package com.victoroliveira.messenger.service.impl;

import com.victoroliveira.messenger.exceptions.StoryNotFoundException;
import com.victoroliveira.messenger.exceptions.StoryNotOwnedException;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.models.Story;
import com.victoroliveira.messenger.repository.StoryRepository;
import com.victoroliveira.messenger.service.ProfileService;
import com.victoroliveira.messenger.service.StoryService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoryServiceImpl implements StoryService {

    private ProfileService profileService;
    private StoryRepository storyRepository;

    public StoryServiceImpl(ProfileService profileService, StoryRepository storyRepository) {
        this.profileService = profileService;
        this.storyRepository = storyRepository;
    }

    @Override
    public Story createStory(Story story, String username) {
        Profile profile = profileService.findByUsername(username);
        story.setProfile(profile);
        story.setPostTime(LocalDateTime.now());
        return storyRepository.save(story);
    }

    @Override
    public void deleteStory(long id, String username) {
        Profile profile = profileService.findByUsername(username);
        Story story = storyRepository.findById(id).orElse(null);
        if (story == null) {
            throw new StoryNotFoundException(id);
        }
        if (!story.getProfile().getUsername().equals(username)) {
            throw new StoryNotOwnedException(id);
        }
        storyRepository.delete(story);
    }

    @Override
    public List<Story> allStoriesOfSomeone(String username) {
        return null;
    }

    private void cronDeleteStory(Story story) {
        storyRepository.delete(story);
    }
    //@Scheduled(initialDelay = 1000, fixedRate = 300000) 5 minutes with 1 second of initial delay
    @Scheduled(initialDelay = 1000, fixedRate = 10000)
    private void deleteExpiredStories() {
        List<Story> stories = storyRepository.findAll();
        LocalDateTime yesterday = LocalDateTime.now().minusDays(1);
        int count = 0;
        while (stories.size() > 0 && yesterday.isAfter(stories.get(0).getPostTime())) {
            this.cronDeleteStory(stories.get(0));
            stories.remove(0);
            ++count;
        }
        System.out.println("Number of stories deleted: " + count);
        System.out.println("Current time is :: " + LocalDateTime.now());
    }
}
