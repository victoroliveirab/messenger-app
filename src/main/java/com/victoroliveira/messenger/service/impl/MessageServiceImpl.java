package com.victoroliveira.messenger.service.impl;

import com.victoroliveira.messenger.exceptions.InvalidDestinationException;
import com.victoroliveira.messenger.exceptions.UserNotFoundException;
import com.victoroliveira.messenger.models.Message;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.repository.MessageRepository;
import com.victoroliveira.messenger.repository.ProfileRepository;
import com.victoroliveira.messenger.service.MessageService;
import com.victoroliveira.messenger.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    private ProfileService profileService;

    private MessageRepository messageRepository;

    public MessageServiceImpl(ProfileService profileService, MessageRepository messageRepository) {
        this.profileService = profileService;
        this.messageRepository = messageRepository;
    }

    @Override
    public void sendMessage(Message message, String senderUsername, String receiverUsername) {
        Profile sender = profileService.findByUsername(senderUsername);
        Profile receiver = profileService.findByUsername(receiverUsername);
        checkProfilesInvolved(senderUsername, receiverUsername);
        LocalDateTime now = LocalDateTime.now();
        message.setSourceProfile(sender);
        message.setDestinationProfile(receiver);
        message.setSendTime(now);
        messageRepository.save(message);
    }

    @Override
    public List<Message> getMessages(String requester, String target) {
        checkProfilesInvolved(requester, target);
        Profile requesterProfile = profileService.findByUsername(requester);
        Profile targetProfile = profileService.findByUsername(target);
        List<Message> messages = messageRepository.findAllBySourceProfileAndDestinationProfile(requesterProfile, targetProfile);
        List<Message> messages2 = messageRepository.findAllBySourceProfileAndDestinationProfile(targetProfile, requesterProfile);
        messages.addAll(messages2);
        return messages;
    }

    private void checkProfilesInvolved(String requester, String target) {
        Profile targetProfile = profileService.findByUsername(target);
        if (targetProfile == null) {
            throw new UserNotFoundException(target);
        }
        if (requester.equals(target)) {
            throw new InvalidDestinationException();
        }
    }
}
