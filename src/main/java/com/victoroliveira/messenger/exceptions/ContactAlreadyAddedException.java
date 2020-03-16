package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ContactAlreadyAddedException extends RuntimeException {
    public ContactAlreadyAddedException(String username) {
        super("ContactAlreadyAddedException: you already have " + username + " in your friends list");
    }
}
