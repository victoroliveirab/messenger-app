package com.victoroliveira.messenger.exceptions;

public class UnderageException extends RuntimeException {
    public UnderageException() {
        super("Sorry. You are still a minor. When you make 18, come back!");
    }
}
