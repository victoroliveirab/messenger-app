package com.victoroliveira.messenger.exceptions;

public class FriendNotAddedException extends Throwable {
    public FriendNotAddedException(String username) {
        super("Error: you don't have " + username + " in your friends list");
    }
}
