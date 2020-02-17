package com.victoroliveira.messenger.exceptions;

public class InvalidDateException extends RuntimeException {
    public InvalidDateException() {
        super("The date informed is not valid. Please try again.");
    }
}
