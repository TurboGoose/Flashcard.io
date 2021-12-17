package com.turbogoose.Flashcard.io.controller;

import com.turbogoose.Flashcard.io.entity.DeckEntity;
import com.turbogoose.Flashcard.io.entity.UserEntity;
import com.turbogoose.Flashcard.io.exception.UserNotFoundException;
import com.turbogoose.Flashcard.io.model.DeckModel;
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
@RequestMapping("/decks")
public class DeckController {
    @Autowired
    private UserService userService;
    @Autowired
    private DeckService deckService;
    @Autowired
    private CardService cardService;

    @GetMapping
    public ResponseEntity getAllDecks(@RequestHeader int userId) {
        try {
            UserEntity user = userService.getUser(userId);
            List<DeckModel> decks = user.getDecks().stream()
                    .map(de -> DeckModel.toDeckModel(de).excludeCards())
                    .collect(Collectors.toList());
            return ResponseEntity.ok(decks);
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity createNewDeck(@RequestHeader int userId, @RequestBody DeckEntity deck) {
        try {
            DeckModel newDeck = DeckModel.toDeckModel(deckService.createDeck(deck, userId)).excludeCards();
            return ResponseEntity.ok(newDeck);
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}
