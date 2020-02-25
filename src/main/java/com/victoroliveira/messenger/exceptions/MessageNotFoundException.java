package com.victoroliveira.messenger.exceptions;

public class MessageNotFoundException extends RuntimeException {
    public MessageNotFoundException() {
        super("The message you're trying to delete does not exist.");
    }
}
