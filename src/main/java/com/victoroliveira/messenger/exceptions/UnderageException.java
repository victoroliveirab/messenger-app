package com.victoroliveira.messenger.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class UnderageException extends RuntimeException {
    public UnderageException() {
        super("UnderageException: Sorry. You are still a minor. When you make 18, come back!");
    }
}
