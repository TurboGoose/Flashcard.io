package com.turbogoose.Flashcard.io.exception;

public class DeckNotFoundException extends Exception {

    public DeckNotFoundException() {
    }

    public DeckNotFoundException(String message) {
        super(message);
    }
}
