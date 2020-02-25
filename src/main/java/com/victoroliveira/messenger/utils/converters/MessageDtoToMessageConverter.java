package com.victoroliveira.messenger.utils.converters;

import com.victoroliveira.messenger.dto.MessageDto;
import com.victoroliveira.messenger.models.Message;
import org.springframework.beans.BeanUtils;

public class MessageDtoToMessageConverter {

    public static Message convert(MessageDto messageDto) {
        Message message = new Message();
        BeanUtils.copyProperties(messageDto, message);
        return message;
    }
}
