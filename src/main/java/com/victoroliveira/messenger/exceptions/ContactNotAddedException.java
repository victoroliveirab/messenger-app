package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ContactNotAddedException extends RuntimeException {
    public ContactNotAddedException(String username) {
        super("Error: you don't have " + username + " in your friends list");
    }
}
