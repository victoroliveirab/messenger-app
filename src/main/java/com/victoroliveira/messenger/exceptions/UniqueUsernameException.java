package com.victoroliveira.messenger.exceptions;

public class UniqueUsernameException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    public UniqueUsernameException(String username) {
        super("The name " + username + " is already taken. Try another");
    }
}
