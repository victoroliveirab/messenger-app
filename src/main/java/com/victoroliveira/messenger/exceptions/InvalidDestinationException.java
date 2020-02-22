package com.victoroliveira.messenger.exceptions;

public class InvalidDestinationException extends RuntimeException {
    public InvalidDestinationException() {
        super("Cannot send a message to yourself");
    }
}
