package com.victoroliveira.messenger.exceptions;

public class InvalidInputException extends RuntimeException {
    public InvalidInputException(String field) {
        super("The following field contains an invalid entry: " + field);
    }
}
