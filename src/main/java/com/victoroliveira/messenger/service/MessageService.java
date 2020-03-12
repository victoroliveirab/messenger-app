package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.models.Message;

import java.util.List;

public interface MessageService {
    void sendMessage(Message message, String senderUsername, String receiverUsername);
    List<Message> getMessages(String requester, String target);
    List<Message> deleteMessage(String requester, Long id);
    void deleteChat(String requester, String target);
    void deleteAllMessages(String requester);
    Message findLastMessageInvolvingProfileAndContact(String profile, String contact);
}
