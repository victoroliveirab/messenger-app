package com.victoroliveira.messenger.exceptions;

public class ContactAlreadyAddedException extends RuntimeException {
    public ContactAlreadyAddedException(String username) {
        super("Error: you already have " + username + " in your friends list");
    }
}
