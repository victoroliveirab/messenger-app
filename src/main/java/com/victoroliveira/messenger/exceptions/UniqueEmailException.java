package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UniqueEmailException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UniqueEmailException(String email) {
        super(email + " is already linked to another account.");
    }
}
