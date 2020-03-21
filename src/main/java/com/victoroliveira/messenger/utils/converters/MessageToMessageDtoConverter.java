package com.victoroliveira.messenger.utils.converters;

import com.victoroliveira.messenger.dto.MessageDto;
import com.victoroliveira.messenger.models.Message;
import com.victoroliveira.messenger.utils.comparators.MessageDtoComparatorBySendTime;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class MessageToMessageDtoConverter {
    private static MessageDtoComparatorBySendTime messageDtoComparatorBySendTime = new MessageDtoComparatorBySendTime();
    public static MessageDto convert(Message message) {
        System.out.println(message);
        MessageDto messageDto = new MessageDto();;
        BeanUtils.copyProperties(message, messageDto, "destinationProfile", "sourceProfile");
        messageDto.setSourceUsername(message.getSourceProfile().getUsername());
        return messageDto;
    }

    public static List<MessageDto> convertAll(List<Message> messages) {
        return messages.stream().filter(Objects::nonNull)
                .map(MessageToMessageDtoConverter::convert)
                .sorted((MessageDto dto1, MessageDto dto2) -> messageDtoComparatorBySendTime.compare(dto1, dto2))
                .collect(Collectors.toList());
    }
}
