package com.turbogoose.Flashcard.io.controller;

import com.turbogoose.Flashcard.io.entity.CardEntity;
import com.turbogoose.Flashcard.io.exception.DeckNotFoundException;
import com.turbogoose.Flashcard.io.model.CardModel;
import com.turbogoose.Flashcard.io.service.CardService;
import com.turbogoose.Flashcard.io.service.DeckService;
import com.turbogoose.Flashcard.io.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("decks/{deckId}/cards")
public class CardsController {
    @Autowired
    private UserService userService;
    @Autowired
    private DeckService deckService;
    @Autowired
    private CardService cardService;

    @GetMapping
    public ResponseEntity getAllCards(@RequestHeader int userId, @PathVariable int deckId) {
        try {
            if (!userService.isDeckBelongsToUser(userId, deckId)) {
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
            List<CardModel> cards = deckService.getDeck(deckId).getCards().stream()
                    .map(CardModel::toCardModel)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(cards);
        } catch (DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity createNewCard(@RequestHeader int userId, @PathVariable int deckId, @RequestBody CardEntity card) {
        try {
            if (!userService.isDeckBelongsToUser(userId, deckId)) {
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
            CardModel newCard = CardModel.toCardModel(cardService.createCard(card, deckId));
            return ResponseEntity.ok(newCard);
        } catch (DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}
