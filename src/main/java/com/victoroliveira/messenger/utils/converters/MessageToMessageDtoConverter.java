package com.victoroliveira.messenger.utils.converters;

import com.victoroliveira.messenger.dto.MessageDto;
import com.victoroliveira.messenger.models.Message;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

public class MessageToMessageDtoConverter {
    public static MessageDto convert(Message message) {
        System.out.println(message);
        MessageDto messageDto = new MessageDto();;
        BeanUtils.copyProperties(message, messageDto, "destinationProfile", "sourceProfile");
        messageDto.setSourceUsername(message.getSourceProfile().getUsername());
        return messageDto;
    }

    public static List<MessageDto> convertAll(List<Message> messages) {
        return messages.stream().map(MessageToMessageDtoConverter::convert).collect(Collectors.toList());
    }
}
