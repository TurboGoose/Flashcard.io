package com.turbogoose.Flashcard.io.controller;

import com.turbogoose.Flashcard.io.entity.CardEntity;
import com.turbogoose.Flashcard.io.entity.DeckEntity;
import com.turbogoose.Flashcard.io.entity.UserEntity;
import com.turbogoose.Flashcard.io.exception.CardNotFoundException;
import com.turbogoose.Flashcard.io.exception.DeckNotFoundException;
import com.turbogoose.Flashcard.io.exception.UserNotFoundException;
import com.turbogoose.Flashcard.io.model.CardModel;
import com.turbogoose.Flashcard.io.model.DeckModel;
import com.turbogoose.Flashcard.io.model.LearningUpdateModel;
import com.turbogoose.Flashcard.io.service.CardService;
import com.turbogoose.Flashcard.io.service.DeckService;
import com.turbogoose.Flashcard.io.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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

    @RequestMapping("/{deckId}")
    @GetMapping
    public ResponseEntity getDeck(@PathVariable int deckId) {
        try {
            DeckModel deck = DeckModel.toDeckModel(deckService.getDeck(deckId));
            return ResponseEntity.ok(deck);
        } catch (DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping("/{deckId}")
    @PutMapping
    public ResponseEntity updateDeck(@RequestBody DeckEntity update) {
        try {
            DeckModel deck = DeckModel.toDeckModel(deckService.updateDeck(update));
            return ResponseEntity.ok(deck);
        } catch (DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping("/{deckId}")
    @DeleteMapping
    public ResponseEntity deleteDeck(@PathVariable int deckId) {
        deckService.deleteDeck(deckId);
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

    @RequestMapping("/{deckId}/learn")
    @GetMapping
    public ResponseEntity getLearningData(@PathVariable int deckId) {
        try {
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

    @RequestMapping("/{deckId}/learn")
    @PutMapping
    public ResponseEntity updateLearnedCard(@PathVariable String deckId, @RequestBody LearningUpdateModel update) {
        try {
            CardModel updatedCard = CardModel.toCardModel(
                    cardService.updateCardDuringLearning(update.getCardId(), update.getQuality())
            );
            return ResponseEntity.ok(updatedCard);
        } catch (CardNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping("/{deckId}/cards")
    @GetMapping
    public ResponseEntity getAllCards(@PathVariable int deckId) {
        try {
            List<CardModel> cards = deckService.getDeck(deckId).getCards().stream()
                    .map(CardModel::toCardModel)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(cards);
        } catch (DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping("/{deckId}/cards")
    @PostMapping
    public ResponseEntity createNewCard(@PathVariable int deckId, @RequestBody CardEntity card) {
        try {
            CardModel newCard = CardModel.toCardModel(cardService.createCard(card, deckId));
            return ResponseEntity.ok(newCard);
        } catch (DeckNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping("/{deckId}/cards/{cardId}")
    @GetMapping
    public ResponseEntity getCard(@PathVariable String deckId, @PathVariable int cardId) {
        try {
            CardModel card = CardModel.toCardModel(cardService.getCard(cardId));
            return ResponseEntity.ok(card);
        } catch (CardNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping("/{deckId}/cards/{cardId}")
    @PutMapping
    public ResponseEntity updateCard(@PathVariable String deckId, @RequestBody CardEntity update) {
        try {
            CardModel card = CardModel.toCardModel(cardService.updateCard(update));
            return ResponseEntity.ok(card);
        } catch (CardNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping("/{deckId}/cards/{cardId}")
    @DeleteMapping
    public ResponseEntity deleteCard(@PathVariable String deckId, @PathVariable int cardId) {
        cardService.deleteCard(cardId);
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }
}
