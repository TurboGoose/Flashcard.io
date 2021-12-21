package com.turbogoose.Flashcard.io.controller;

import com.turbogoose.Flashcard.io.entity.DeckEntity;
import com.turbogoose.Flashcard.io.exception.DeckNotFoundException;
import com.turbogoose.Flashcard.io.model.DeckModel;
import com.turbogoose.Flashcard.io.service.DeckService;
import com.turbogoose.Flashcard.io.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("decks/{deckId}")
public class DeckController {
    @Autowired
    private UserService userService;
    @Autowired
    private DeckService deckService;

    @GetMapping
    public ResponseEntity getDeck(@RequestHeader int userId, @PathVariable int deckId) {
        try {
            if (!userService.isDeckBelongsToUser(userId, deckId)) {
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
            DeckModel deck = DeckModel.toDeckModel(deckService.getDeck(deckId));
            return ResponseEntity.ok(deck);
        } catch (DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity updateDeck(@RequestHeader int userId, @PathVariable int deckId, @RequestBody DeckEntity update) {
        try {
            if (!userService.isDeckBelongsToUser(userId, deckId)) {
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
            update.setDeckId(deckId);
            DeckModel deck = DeckModel.toDeckModel(deckService.updateDeck(update));
            return ResponseEntity.ok(deck);
        } catch (DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping
    public ResponseEntity deleteDeck(@RequestHeader int userId, @PathVariable int deckId) {
        try {
            if (!userService.isDeckBelongsToUser(userId, deckId)) {
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
        } catch (DeckNotFoundException ignore) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        deckService.deleteDeck(deckId);
        return ResponseEntity.ok().build();
    }
}
