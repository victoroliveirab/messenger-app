package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class MessageNotFoundException extends RuntimeException {
    public MessageNotFoundException() {
        super("The message you're trying to delete does not exist.");
    }
}
