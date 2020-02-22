package com.victoroliveira.messenger.exceptions;

public class AutoAddException extends RuntimeException {
    public AutoAddException() {
        super("Error. Cannot add yourself");
    }
}
