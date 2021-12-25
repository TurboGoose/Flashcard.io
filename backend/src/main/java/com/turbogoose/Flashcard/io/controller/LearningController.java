package com.turbogoose.Flashcard.io.controller;

import com.turbogoose.Flashcard.io.exception.CardNotFoundException;
import com.turbogoose.Flashcard.io.exception.DeckNotFoundException;
import com.turbogoose.Flashcard.io.model.CardModel;
import com.turbogoose.Flashcard.io.model.LearningUpdateModel;
import com.turbogoose.Flashcard.io.service.CardService;
import com.turbogoose.Flashcard.io.service.DeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("decks/{deckId}/learn")
public class LearningController {
    @Autowired
    private DeckService deckService;
    @Autowired
    private CardService cardService;

    @GetMapping
    public ResponseEntity getLearningData(Principal principal, @PathVariable int deckId) {
        try {
            String userId = principal.getName();
            if (!deckService.checkDeckBelongsToUser(deckId, userId)) {
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
            LocalDateTime now = LocalDateTime.now();
            List<CardModel> cards = deckService.getDeck(deckId).getCards().stream()
                    .filter(card -> card.getRepetition().getNextPractice().isBefore(now))
                    .map(CardModel::toCardModel)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(cards);
        } catch (DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity updateLearnedCard(Principal principal, @PathVariable int deckId, @RequestBody LearningUpdateModel update) {
        try {
            String userId = principal.getName();
            int cardId = update.getCardId();
            if (!deckService.checkDeckBelongsToUser(deckId, userId) ||
                    !cardService.checkCardBelongsToDeck(cardId, deckId)) {
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
            CardModel updatedCard = CardModel.toCardModel(
                    cardService.updateCardDuringLearning(update.getCardId(), update.getQuality())
            );
            return ResponseEntity.ok(updatedCard);
        } catch (CardNotFoundException | DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}
