package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class InvalidConfirmationTokenException extends RuntimeException {
    public InvalidConfirmationTokenException() {
        super("InvalidConfirmationTokenException: This confirmation token does not exist or has expired");
    }
}