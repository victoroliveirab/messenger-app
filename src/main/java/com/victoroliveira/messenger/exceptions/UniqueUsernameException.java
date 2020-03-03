package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UniqueUsernameException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    public UniqueUsernameException(String username) {
        super("The name " + username + " is already taken. Try another");
    }
}
