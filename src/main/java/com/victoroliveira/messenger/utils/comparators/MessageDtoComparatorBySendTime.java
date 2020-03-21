package com.victoroliveira.messenger.utils.comparators;

import com.victoroliveira.messenger.dto.MessageDto;

import java.util.Comparator;

public class MessageDtoComparatorBySendTime implements Comparator<MessageDto> {
    @Override
    public int compare(MessageDto dto1, MessageDto dto2) {
        return dto1.getSendTime().compareTo(dto2.getSendTime());
    }
}
