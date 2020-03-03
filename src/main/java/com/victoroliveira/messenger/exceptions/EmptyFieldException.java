package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EmptyFieldException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    public EmptyFieldException(String field) {
        super("The following field cannot be empty: " + field);
    }

}
