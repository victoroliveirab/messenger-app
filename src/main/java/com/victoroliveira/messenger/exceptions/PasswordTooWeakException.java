package com.victoroliveira.messenger.exceptions;

public class PasswordTooWeakException extends RuntimeException {
    public PasswordTooWeakException() {
        super("The password you entered is too weak. Your password must have at least one uppercase letter, " +
                "one lowercase letter, one number and one special character, and also must be at least 8 characters long");
    }
}
