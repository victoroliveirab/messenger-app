package com.victoroliveira.messenger.service.impl;

import com.victoroliveira.messenger.models.Message;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.repository.MessageRepository;
import com.victoroliveira.messenger.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Override
    public void sendMessage(Message message) {
        LocalDateTime now = LocalDateTime.now();
        message.setSendTime(now);
        messageRepository.save(message);
    }

    @Override
    public List<Message> getMessages(Profile requester, Profile target) {
        List<Message> messages = messageRepository.findAllBySourceProfileAndDestinationProfile(requester, target);
        List<Message> messages2 = messageRepository.findAllBySourceProfileAndDestinationProfile(target, requester);
        messages.addAll(messages2);
        return messages;
    }
}
