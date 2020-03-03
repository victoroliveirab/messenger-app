package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class InvalidConfirmationToken extends RuntimeException {
    public InvalidConfirmationToken() {
        super("This confirmation token does not exist or has expired");
    }
}