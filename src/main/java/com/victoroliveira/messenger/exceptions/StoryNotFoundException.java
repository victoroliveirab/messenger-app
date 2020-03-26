package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class StoryNotFoundException extends RuntimeException {
    public StoryNotFoundException(long id) {
        super("The story with id " + id + " is not in the records.");
    }
}
