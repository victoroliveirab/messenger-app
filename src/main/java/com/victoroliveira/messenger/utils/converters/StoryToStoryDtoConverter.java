package com.victoroliveira.messenger.utils.converters;

import com.victoroliveira.messenger.dto.StoryDto;
import com.victoroliveira.messenger.models.Story;
import org.springframework.beans.BeanUtils;

public class StoryToStoryDtoConverter {
    public static StoryDto convert(Story story) {
        StoryDto dto = new StoryDto();
        BeanUtils.copyProperties(story, dto);
        dto.setUsername(story.getProfile().getUsername());
        return dto;
    }
}
