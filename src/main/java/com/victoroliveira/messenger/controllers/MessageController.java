package com.victoroliveira.messenger.controllers;

import com.victoroliveira.messenger.dto.MessageDto;
import com.victoroliveira.messenger.models.Message;
import com.victoroliveira.messenger.service.MessageService;
import com.victoroliveira.messenger.utils.converters.MessageDtoToMessageConverter;
import com.victoroliveira.messenger.utils.converters.MessageToMessageDtoConverter;
import com.victoroliveira.messenger.utils.converters.TokenToUsernameConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping(value="/msg/{target}")
    public ResponseEntity<List<MessageDto>> getMessagesToAContact(@RequestHeader(name = "Authorization") String token,
                                                                  @PathVariable String target) {
        String requester = TokenToUsernameConverter.convert(token);
        List<Message> messages = messageService.getMessages(requester, target);
        List<MessageDto> messagesDtos = MessageToMessageDtoConverter.convertAll(messages);
        return new ResponseEntity<>(messagesDtos, HttpStatus.OK);
    }

    @GetMapping(value="/msg/{target}/last")
    public ResponseEntity<MessageDto> getLastMessageToAContact(@RequestHeader(name = "Authorization") String token,
                                                                  @PathVariable String target) {
        String requester = TokenToUsernameConverter.convert(token);
        System.out.println(requester + " requested last message with " + target);
        Message message = messageService.findLastMessageInvolvingProfileAndContact(target, requester);
        if (message == null) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        MessageDto messagesDto = MessageToMessageDtoConverter.convert(message);
        return new ResponseEntity<>(messagesDto, HttpStatus.OK);
    }

    @PostMapping(value="/msg/{receiver}")
    public ResponseEntity<List<MessageDto>> sendMessage(@RequestHeader(name = "Authorization") String token,
                                                        @PathVariable String receiver,
                                                        @RequestBody MessageDto messageDto) {
        String sender = TokenToUsernameConverter.convert(token);
        Message newMsg = MessageDtoToMessageConverter.convert(messageDto);
        messageService.sendMessage(newMsg, sender, receiver);
        List<Message> messages = messageService.getMessages(sender, receiver);
        List<MessageDto> messagesDtos = MessageToMessageDtoConverter.convertAll(messages);
        return new ResponseEntity<>(messagesDtos, HttpStatus.OK);
    }

    @DeleteMapping(value="/msg/delete/msg/{id}")
    public ResponseEntity<List<MessageDto>> deleteOneMessage(@RequestHeader(name = "Authorization") String token,
                                                             @PathVariable Long id) {
        String requester = TokenToUsernameConverter.convert(token);
        List<Message> messages = messageService.deleteMessage(requester, id);
        List<MessageDto> messagesDtos = MessageToMessageDtoConverter.convertAll(messages);
        return new ResponseEntity<>(messagesDtos, HttpStatus.OK);
    }

    @DeleteMapping(value="/msg/delete/{contact}")
    public ResponseEntity<List<MessageDto>> deleteChat(@RequestHeader(name = "Authorization") String token,
                                                       @PathVariable String contact) {
        String requester = TokenToUsernameConverter.convert(token);
        messageService.deleteChat(requester, contact);
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }

    @DeleteMapping(value="/msg/delete/all")
    public ResponseEntity<List<MessageDto>> deleteAllMessages(@RequestHeader(name = "Authorization") String token) {
        String requester = TokenToUsernameConverter.convert(token);
        messageService.deleteAllMessages(requester);
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }
}
