package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class AutoAddException extends RuntimeException {
    public AutoAddException() {
        super("AutoAddException: Error. Cannot add yourself");
    }
}
