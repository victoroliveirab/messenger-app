package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class NotInvolvedInMessageException extends RuntimeException {
    public NotInvolvedInMessageException() {
        super("You cannot erase a message you are neither the sender nor the receiver");
    }
}
