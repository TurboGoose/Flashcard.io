package com.turbogoose.Flashcard.io.service;

import com.turbogoose.Flashcard.io.entity.CardEntity;
import com.turbogoose.Flashcard.io.entity.DeckEntity;
import com.turbogoose.Flashcard.io.exception.CardNotFoundException;
import com.turbogoose.Flashcard.io.exception.DeckNotFoundException;
import com.turbogoose.Flashcard.io.repository.CardRepository;
import com.turbogoose.Flashcard.io.repository.DeckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CardService {
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private DeckRepository deckRepository;

    public CardEntity createCard(CardEntity card, int deckId) throws DeckNotFoundException {
        DeckEntity deck = deckRepository.findById(deckId).orElseThrow(DeckNotFoundException::new);
        card.setCardId(null);
        card.setDeck(deck);
        card.setCreationTime(LocalDateTime.now());
        card.setLastModified(LocalDateTime.now());
        return cardRepository.save(card);
    }

    public CardEntity getCard(int cardId) throws CardNotFoundException {
        return cardRepository.findById(cardId).orElseThrow(CardNotFoundException::new);
    }

    public CardEntity updateCard(CardEntity card) throws CardNotFoundException {
        CardEntity oldCard = cardRepository.findById(card.getCardId()).orElseThrow(CardNotFoundException::new);
        oldCard.setFront(card.getFront());
        oldCard.setBack(card.getBack());
        oldCard.setLastModified(LocalDateTime.now());
        return cardRepository.save(oldCard);
    }

    public void deleteCard(int cardId) {
        cardRepository.deleteById(cardId);
    }
}
