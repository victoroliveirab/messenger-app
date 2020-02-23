package com.victoroliveira.messenger.exceptions;

public class InvalidDestinationException extends RuntimeException {
    public InvalidDestinationException() {
        super("Cannot have a message from/to yourself");
    }
}
