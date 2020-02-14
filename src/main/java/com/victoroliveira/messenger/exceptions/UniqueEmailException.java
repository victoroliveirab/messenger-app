package com.victoroliveira.messenger.exceptions;

public class UniqueEmailException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UniqueEmailException(String email) {
        super(email + " is already linked to another account.");
    }
}
