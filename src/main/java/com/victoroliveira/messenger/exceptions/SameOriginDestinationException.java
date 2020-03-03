package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class SameOriginDestinationException extends RuntimeException {
    public SameOriginDestinationException() {
        super("Cannot have a message from/to yourself");
    }
}
