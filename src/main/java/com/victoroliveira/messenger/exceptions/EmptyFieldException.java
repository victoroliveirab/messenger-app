package com.victoroliveira.messenger.exceptions;

public class EmptyFieldException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    public EmptyFieldException(String field) {
        super("The following field cannot be empty: " + field);
    }

}
