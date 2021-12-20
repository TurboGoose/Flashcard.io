package com.turbogoose.Flashcard.io.exception;

public class CardNotFoundException extends Exception {
    public CardNotFoundException() {
    }

    public CardNotFoundException(String message) {
        super(message);
    }
}
