package com.turbogoose.Flashcard.io.controller;

import com.turbogoose.Flashcard.io.entity.CardEntity;
import com.turbogoose.Flashcard.io.exception.CardNotFoundException;
import com.turbogoose.Flashcard.io.model.CardModel;
import com.turbogoose.Flashcard.io.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("decks/{deckId}/cards/{cardId}")
public class CardController {
    @Autowired
    private CardService cardService;

    @GetMapping
    public ResponseEntity getCard(@PathVariable int deckId, @PathVariable int cardId) {
        try {
            CardModel card = CardModel.toCardModel(cardService.getCard(cardId));
            return ResponseEntity.ok(card);
        } catch (CardNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity updateCard(@PathVariable int deckId, @PathVariable int cardId, @RequestBody CardEntity update) {
        try {
            update.setCardId(cardId);
            CardModel card = CardModel.toCardModel(cardService.updateCard(update));
            return ResponseEntity.ok(card);
        } catch (CardNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping
    public ResponseEntity deleteCard(@PathVariable int deckId, @PathVariable int cardId) {
        cardService.deleteCard(cardId);
        return ResponseEntity.ok().build();
    }
}
