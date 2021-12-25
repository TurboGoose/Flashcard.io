package com.turbogoose.Flashcard.io.controller;

import com.turbogoose.Flashcard.io.entity.CardEntity;
import com.turbogoose.Flashcard.io.exception.CardNotFoundException;
import com.turbogoose.Flashcard.io.model.CardModel;
import com.turbogoose.Flashcard.io.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin
@RestController
@RequestMapping("decks/{deckId}/cards/{cardId}")
public class CardController {
    @Autowired
    private CardService cardService;

    @GetMapping
        public ResponseEntity getCard(Principal principal, @PathVariable int deckId, @PathVariable int cardId) {
        try {
            String userId = principal.getName();
            // validate deck belongs to user here
            CardModel card = CardModel.toCardModel(cardService.getCard(cardId));
            return ResponseEntity.ok(card);
        } catch (CardNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity updateCard(Principal principal, @PathVariable int deckId, @PathVariable int cardId, @RequestBody CardEntity update) {
        try {
            String userId = principal.getName();
            // validate deck belongs to user here
            update.setCardId(cardId);
            CardModel card = CardModel.toCardModel(cardService.updateCard(update));
            return ResponseEntity.ok(card);
        } catch (CardNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping
    public ResponseEntity deleteCard(Principal principal, @PathVariable int deckId, @PathVariable int cardId) {
        String userId = principal.getName();
        // validate deck belongs to user here
        cardService.deleteCard(cardId);
        return ResponseEntity.ok().build();
    }
}
