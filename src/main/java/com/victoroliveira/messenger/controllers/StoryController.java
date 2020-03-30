package com.victoroliveira.messenger.controllers;

import com.victoroliveira.messenger.dto.StoryDto;
import com.victoroliveira.messenger.models.Story;
import com.victoroliveira.messenger.service.StoryService;
import com.victoroliveira.messenger.utils.converters.StoryDtoToStoryConverter;
import com.victoroliveira.messenger.utils.converters.StoryToStoryDtoConverter;
import com.victoroliveira.messenger.utils.converters.TokenToUsernameConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class StoryController {
    @Autowired
    private StoryService storyService;

    @GetMapping("/story")
    public ResponseEntity<List<StoryDto>> getStories(@RequestHeader(name = "Authorization") String token) {
        List<Story> ownedStories = storyService.allStoriesOfSomeone(TokenToUsernameConverter.convert(token));
        List<StoryDto> ownedStoriesDto = StoryToStoryDtoConverter.convertAll(ownedStories);
        return new ResponseEntity<>(ownedStoriesDto, HttpStatus.OK);
    }

    @GetMapping("/story/{username}")
    public ResponseEntity<List<StoryDto>> getStoriesOfAnUser(@PathVariable String username) {
        List<Story> storiesOfUser = storyService.allStoriesOfSomeone(username);
        List<StoryDto> storiesOfUserDto = StoryToStoryDtoConverter.convertAll(storiesOfUser);
        return new ResponseEntity<>(storiesOfUserDto, HttpStatus.OK);
    }

    @PostMapping("/story")
    @ResponseBody
    public ResponseEntity<StoryDto> createNewStory(@RequestHeader(name = "Authorization") String token,
                                                   @RequestBody StoryDto storyDto) {
        String username = TokenToUsernameConverter.convert(token);
        Story story = storyService.createStory(StoryDtoToStoryConverter.convert(storyDto), username);
        StoryDto newDto = StoryToStoryDtoConverter.convert(story);
        return new ResponseEntity<>(newDto, HttpStatus.OK);
    }

    @PostMapping("/storyPicture")
    @ResponseBody
    public ResponseEntity<StoryDto> createNewStoryWithPhoto(@RequestHeader(name = "Authorization") String token,
                                                   @RequestBody StoryDto storyDto,
                                                   @RequestParam("file") MultipartFile file) {
        System.out.println("Creating new story");
        String user = TokenToUsernameConverter.convert(token);
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }

    @DeleteMapping("/story/{id}")
    public ResponseEntity<Story> deleteStory(@RequestHeader(name = "Authorization") String token,
                                        @PathVariable long id) {
        String username = TokenToUsernameConverter.convert(token);
        storyService.deleteStory(id, username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
