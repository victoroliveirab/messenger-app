package com.victoroliveira.messenger.exceptions;

public class NotInvolvedInMessageException extends RuntimeException {
    public NotInvolvedInMessageException() {
        super("You cannot erase a message you are neither the sender nor the receiver");
    }
}
