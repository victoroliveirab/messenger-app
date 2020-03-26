package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class StoryNotOwnedException extends RuntimeException {
    public StoryNotOwnedException(long id) {
        super("The story with id " + id + " is not owned by you.");
    }
}
