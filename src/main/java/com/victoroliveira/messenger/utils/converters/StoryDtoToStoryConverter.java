package com.victoroliveira.messenger.utils.converters;

import com.victoroliveira.messenger.dto.StoryDto;
import com.victoroliveira.messenger.models.Story;
import org.springframework.beans.BeanUtils;

public class StoryDtoToStoryConverter {
    public static Story convert(StoryDto dto) {
        Story story = new Story();
        BeanUtils.copyProperties(dto, story);
        return story;
    }
}
