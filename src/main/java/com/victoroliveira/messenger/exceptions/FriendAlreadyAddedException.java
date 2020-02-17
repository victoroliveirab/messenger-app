package com.victoroliveira.messenger.exceptions;

public class FriendAlreadyAddedException extends RuntimeException {
    public FriendAlreadyAddedException(String username) {
        super("Error: you already have " + username + " in your friends list");
    }
}
