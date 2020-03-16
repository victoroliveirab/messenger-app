package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class PasswordTooWeakException extends RuntimeException {
    public PasswordTooWeakException() {
        super("PasswordTooWeakException: The password you entered is too weak. Your password must have at least one uppercase letter, " +
                "one lowercase letter, one number and one special character, and also must be at least 8 characters long");
    }
}
