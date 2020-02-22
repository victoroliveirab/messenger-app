package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.models.Message;
import com.victoroliveira.messenger.models.Profile;

import java.util.List;

public interface MessageService {
    void sendMessage(Message message);
    List<Message> getMessages(Profile requester, Profile target);
}
