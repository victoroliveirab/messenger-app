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
    private MessageService messageService;

    @GetMapping(value="/msg/{username}")
    public ResponseEntity<List<Message>> getMessagesToAFriend(@RequestHeader(name = "Authorization") String token,
                                                                 @PathVariable String target) {
        String requester = TokenToUsername.convert(token);
        List<Message> messages = messageService.getMessages(requester, target);
        //List<MessageDto> messageDtos = messages.stream().map(message -> MessageToMessageDtoConverter.convert(message)).collect(Collectors.toList());
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @PostMapping(value="/msg/{username}/send")
    public String sendMessage(@RequestHeader(name = "Authorization") String token, @PathVariable String receiver,
                              @RequestBody MessageDto messageDto) {
        String sender = TokenToUsername.convert(token);
        Message newMsg = MessageDtoToMessageConverter.convert(messageDto);
        messageService.sendMessage(newMsg, sender, receiver);

        return "Message sent!";
    }
}
