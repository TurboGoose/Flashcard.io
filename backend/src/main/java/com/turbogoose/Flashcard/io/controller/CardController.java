package com.turbogoose.Flashcard.io.controller;

import com.turbogoose.Flashcard.io.entity.CardEntity;
import com.turbogoose.Flashcard.io.exception.CardNotFoundException;
import com.turbogoose.Flashcard.io.exception.DeckNotFoundException;
import com.turbogoose.Flashcard.io.model.CardModel;
import com.turbogoose.Flashcard.io.service.CardService;
import com.turbogoose.Flashcard.io.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("decks/{deckId}/cards/{cardId}")
public class CardController {
    @Autowired
    private UserService userService;
    @Autowired
    private CardService cardService;

    @GetMapping
    public ResponseEntity getCard(@RequestHeader String userId, @PathVariable int deckId, @PathVariable int cardId) {
        try {
            if (!userService.isDeckBelongsToUser(userId, deckId)) {
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
            CardModel card = CardModel.toCardModel(cardService.getCard(cardId));
            return ResponseEntity.ok(card);
        } catch (CardNotFoundException | DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity updateCard(@RequestHeader String userId, @PathVariable int deckId, @PathVariable int cardId, @RequestBody CardEntity update) {
        try {
            if (!userService.isDeckBelongsToUser(userId, deckId)) {
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
            update.setCardId(cardId);
            CardModel card = CardModel.toCardModel(cardService.updateCard(update));
            return ResponseEntity.ok(card);
        } catch (CardNotFoundException | DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping
    public ResponseEntity deleteCard(@RequestHeader String userId, @PathVariable int deckId, @PathVariable int cardId) {
        try {
            if (!userService.isDeckBelongsToUser(userId, deckId)) {
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
        } catch (DeckNotFoundException ignore) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        cardService.deleteCard(cardId);
        return ResponseEntity.ok().build();
    }
}
