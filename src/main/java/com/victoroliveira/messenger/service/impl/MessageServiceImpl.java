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

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
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
        Collections.sort(messages, (msg1, msg2) -> {
            return (int) (msg1.getId() - msg2.getId());
        });
        return messages;
    }

    @Override
    public List<Message> deleteMessage(String requester, Long id) {
        Message message = checkMessageExistence(requester, id);
        Profile requesterProfile = message.getSourceProfile();
        Profile targetProfile = message.getDestinationProfile();
        messageRepository.delete(message);
        return this.getMessages(requesterProfile.getUsername(), targetProfile.getUsername());
    }

    public Message findLastMessageInvolvingProfileAndContact(String profileUsername, String contactUsername) {
        Profile profile = profileService.findByUsername(profileUsername);
        Profile contact = profileService.findByUsername(contactUsername);
        Message message1 = messageRepository.findTopByDestinationProfileAndSourceProfileOrderBySendTimeDesc(contact, profile);
        Message message2 = messageRepository.findTopByDestinationProfileAndSourceProfileOrderBySendTimeDesc(profile, contact);
        if (message1 == null || message2 == null) {
            return message2 == null ? message1 : message2;
        }
        return message1.getId() > message2.getId() ? message1 : message2;
    }

    @Transactional
    @Override
    public void deleteChat(String requester, String target) {
        Profile requesterProfile = profileService.findByUsername(requester);
        Profile targetProfile = profileService.findByUsername(target);
        messageRepository.deleteMessagesByDestinationProfileAndSourceProfile(requesterProfile, targetProfile);
        messageRepository.deleteMessagesByDestinationProfileAndSourceProfile(targetProfile, requesterProfile);
    }

    @Transactional
    @Override
    public void deleteAllMessages(String requester) {
        Profile requesterProfile = profileService.findByUsername(requester);
        messageRepository.deleteMessagesBySourceProfile(requesterProfile);
        messageRepository.deleteMessagesByDestinationProfile(requesterProfile);
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
