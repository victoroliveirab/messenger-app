package com.victoroliveira.messenger.utils;

import com.victoroliveira.messenger.dto.MessageDto;
import com.victoroliveira.messenger.models.Message;
import org.springframework.beans.BeanUtils;

public class MessageToMessageDtoConverter {
    public static MessageDto convert(Message message) {
        MessageDto messageDto = new MessageDto();
        BeanUtils.copyProperties(messageDto, message);
        return messageDto;
    }
}
