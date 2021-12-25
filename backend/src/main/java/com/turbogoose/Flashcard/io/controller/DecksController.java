package com.turbogoose.Flashcard.io.controller;

import com.turbogoose.Flashcard.io.entity.DeckEntity;
import com.turbogoose.Flashcard.io.entity.UserEntity;
import com.turbogoose.Flashcard.io.model.DeckModel;
import com.turbogoose.Flashcard.io.service.DeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/decks")
public class DecksController {
    @Autowired
    private DeckService deckService;

    @GetMapping
    public ResponseEntity getAllDecks(Principal principal) {
//        UserEntity user = (UserEntity) principal;
//        List<DeckModel> decks = user.getDecks().stream()
//                .map(de -> DeckModel.toDeckModel(de).excludeCards())
//                .collect(Collectors.toList());
//        return ResponseEntity.ok(decks);
        System.out.println(principal);
        System.out.println(principal.getName());
        return ResponseEntity.ok(principal);
    }

    @PostMapping
    public ResponseEntity createNewDeck(Principal principal, @RequestBody DeckEntity deck) {
        UserEntity user = (UserEntity) principal;
        DeckModel newDeck = DeckModel.toDeckModel(deckService.createDeck(deck, user)).excludeCards();
        return ResponseEntity.ok(newDeck);
    }
}
