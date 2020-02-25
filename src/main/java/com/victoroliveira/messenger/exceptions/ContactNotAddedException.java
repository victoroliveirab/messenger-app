package com.victoroliveira.messenger.exceptions;

public class ContactNotAddedException extends RuntimeException {
    public ContactNotAddedException(String username) {
        super("Error: you don't have " + username + " in your friends list");
    }
}
