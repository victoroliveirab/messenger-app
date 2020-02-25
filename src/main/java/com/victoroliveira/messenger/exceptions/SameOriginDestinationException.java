package com.victoroliveira.messenger.exceptions;

public class SameOriginDestinationException extends RuntimeException {
    public SameOriginDestinationException() {
        super("Cannot have a message from/to yourself");
    }
}
