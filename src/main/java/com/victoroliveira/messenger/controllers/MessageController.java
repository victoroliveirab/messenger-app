package com.victoroliveira.messenger.controllers;

import com.victoroliveira.messenger.dto.MessageDto;
import com.victoroliveira.messenger.exceptions.InvalidDestinationException;
import com.victoroliveira.messenger.exceptions.UserNotFoundException;
import com.victoroliveira.messenger.models.Message;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.repository.MessageRepository;
import com.victoroliveira.messenger.service.MessageService;
import com.victoroliveira.messenger.service.ProfileService;
import com.victoroliveira.messenger.utils.MessageDtoToMessageConverter;
import com.victoroliveira.messenger.utils.MessageToMessageDtoConverter;
import com.victoroliveira.messenger.utils.TokenToUsername;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class MessageController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private MessageService messageService;

    @GetMapping(value="/msg/{username}")
    public ResponseEntity<List<Message>> getMessagesToAFriend(@RequestHeader(name = "Authorization") String token,
                                                                 @PathVariable String username) {
        Optional<Profile> targetOpt = profileService.findByUsername(username);
        if (!targetOpt.isPresent()) {
            throw new UserNotFoundException(username);
        }
        String senderUsername = TokenToUsername.convert(token);
        if (senderUsername.equals(username)) {
            throw new InvalidDestinationException();
        }
        Profile requester = profileService.findByUsername(TokenToUsername.convert(token)).get();
        Profile target = targetOpt.get();
        List<Message> messages = messageService.getMessages(requester, target);
        //List<MessageDto> messageDtos = messages.stream().map(message -> MessageToMessageDtoConverter.convert(message)).collect(Collectors.toList());
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @PostMapping(value="/msg/{username}/send")
    public String sendMessage(@RequestHeader(name = "Authorization") String token, @PathVariable String username,
                              @RequestBody MessageDto messageDto) {
        Optional<Profile> receiverOpt = profileService.findByUsername(username);
        if (!receiverOpt.isPresent()) {
            throw new UserNotFoundException(username);
        }
        String senderUsername = TokenToUsername.convert(token);
        if (senderUsername.equals(username)) {
            throw new InvalidDestinationException();
        }
        Message newMsg = MessageDtoToMessageConverter.convert(messageDto);
        Profile receiver = receiverOpt.get();
        Profile sender = profileService.findByUsername(senderUsername).get();
        newMsg.setSourceProfile(sender);
        newMsg.setDestinationProfile(receiver);
        messageService.sendMessage(newMsg);

        return "Message sent!";
    }
}
