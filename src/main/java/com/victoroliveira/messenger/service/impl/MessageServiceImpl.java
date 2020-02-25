package com.victoroliveira.messenger.service.impl;

import com.victoroliveira.messenger.exceptions.MessageNotFoundException;
import com.victoroliveira.messenger.exceptions.NotInvolvedInMessageException;
import com.victoroliveira.messenger.exceptions.SameOriginDestinationException;
import com.victoroliveira.messenger.exceptions.UserNotFoundException;
import com.victoroliveira.messenger.models.Message;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.repository.MessageRepository;
import com.victoroliveira.messenger.service.MessageService;
import com.victoroliveira.messenger.service.ProfileService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    public List<Message> deleteMessage(String requester, Long id) {
        Message message = checkMessageExistence(requester, id);
        Profile requesterProfile = message.getSourceProfile();
        Profile targetProfile = message.getDestinationProfile();
        messageRepository.delete(message);
        return this.getMessages(requesterProfile.getUsername(), targetProfile.getUsername());
    }

    private void checkProfilesInvolved(String requester, String target) {
        Profile targetProfile = profileService.findByUsername(target);
        if (targetProfile == null) {
            throw new UserNotFoundException(target);
        }
        if (requester.equals(target)) {
            throw new SameOriginDestinationException();
        }
    }

    private Message checkMessageExistence(String requester, Long id) {
        Optional<Message> messageOpt = messageRepository.findById(id);
        if (!messageOpt.isPresent()) {
            throw new MessageNotFoundException();
        }
        Message message = messageOpt.get();
        if (!message.getSourceProfile().getUsername().equals(requester) && !message.getDestinationProfile().getUsername().equals(requester)) {
            throw new NotInvolvedInMessageException();
        }
        return message;
    }
}
