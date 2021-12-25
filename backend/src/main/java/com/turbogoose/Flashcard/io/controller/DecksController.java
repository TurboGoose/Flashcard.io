package com.turbogoose.Flashcard.io.controller;

import com.turbogoose.Flashcard.io.entity.DeckEntity;
import com.turbogoose.Flashcard.io.model.DeckModel;
import com.turbogoose.Flashcard.io.repository.DeckRepository;
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
    @Autowired
    private DeckRepository deckRepository;

    @GetMapping
    public ResponseEntity getAllDecks(Principal principal) {
        String userId = principal.getName();
        List<DeckModel> decks = deckRepository.findAllByUserId(userId).stream()
                .map(de -> DeckModel.toDeckModel(de).excludeCards())
                .collect(Collectors.toList());
        return ResponseEntity.ok(decks);
    }

    @PostMapping
    public ResponseEntity createNewDeck(Principal principal, @RequestBody DeckEntity deck) {
        String userId = principal.getName();
        DeckEntity newDeck = deckService.createDeck(deck, userId);
        return ResponseEntity.ok(DeckModel.toDeckModel(newDeck).excludeCards());
    }
}
