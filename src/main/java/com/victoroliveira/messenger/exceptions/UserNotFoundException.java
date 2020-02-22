package com.victoroliveira.messenger.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String username) {
        super(username + " does not exist in our records or has blocked you.");
    }
}
