package com.turbogoose.Flashcard.io.controller;

import com.turbogoose.Flashcard.io.entity.DeckEntity;
import com.turbogoose.Flashcard.io.exception.DeckNotFoundException;
import com.turbogoose.Flashcard.io.model.DeckModel;
import com.turbogoose.Flashcard.io.service.DeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("decks/{deckId}")
public class DeckController {
    @Autowired
    private DeckService deckService;

    @GetMapping
    public ResponseEntity getDeck(@PathVariable int deckId) {
        try {
            DeckModel deck = DeckModel.toDeckModel(deckService.getDeck(deckId));
            return ResponseEntity.ok(deck);
        } catch (DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity updateDeck(@PathVariable int deckId, @RequestBody DeckEntity update) {
        try {
            update.setDeckId(deckId);
            DeckModel deck = DeckModel.toDeckModel(deckService.updateDeck(update));
            return ResponseEntity.ok(deck);
        } catch (DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping
    public ResponseEntity deleteDeck(@PathVariable int deckId) {
        deckService.deleteDeck(deckId);
        return ResponseEntity.ok().build();
    }
}
