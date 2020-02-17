package com.victoroliveira.messenger.exceptions;

public class InvalidLengthException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public InvalidLengthException(String attr) {
        super("The following field has an invalid length: " + attr);
    }
}
