package com.victoroliveira.messenger.exceptions;

public class InvalidConfirmationToken extends RuntimeException {
    public InvalidConfirmationToken() {
        super("This confirmation token does not exist or has expired");
    }
}