package com.turbogoose.Flashcard.io.controller;

import com.turbogoose.Flashcard.io.entity.DeckEntity;
import com.turbogoose.Flashcard.io.exception.DeckNotFoundException;
import com.turbogoose.Flashcard.io.model.DeckModel;
import com.turbogoose.Flashcard.io.service.DeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin
@RestController
@RequestMapping("decks/{deckId}")
public class DeckController {
    @Autowired
    private DeckService deckService;

    @GetMapping
    public ResponseEntity getDeck(Principal principal, @PathVariable int deckId) {
        try {
            String userId = principal.getName();
            // validate deck belongs to user here
            DeckModel deck = DeckModel.toDeckModel(deckService.getDeck(deckId));
            return ResponseEntity.ok(deck);
        } catch (DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity updateDeck(Principal principal, @PathVariable int deckId, @RequestBody DeckEntity update) {
        try {
            String userId = principal.getName();
            // validate deck belongs to user here
            update.setDeckId(deckId);
            DeckModel deck = DeckModel.toDeckModel(deckService.updateDeck(update));
            return ResponseEntity.ok(deck);
        } catch (DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping
    public ResponseEntity deleteDeck(Principal principal, @PathVariable int deckId) {
        String userId = principal.getName();
        // validate deck belongs to user here
        deckService.deleteDeck(deckId);
        return ResponseEntity.ok().build();
    }
}
