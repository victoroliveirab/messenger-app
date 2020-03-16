package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class InvalidLengthException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public InvalidLengthException(String attr) {
        super("InvalidLengthException: The following field has an invalid length: " + attr);
    }
}
