package com.turbogoose.Flashcard.io.service;

import com.turbogoose.Flashcard.io.entity.DeckEntity;
import com.turbogoose.Flashcard.io.exception.DeckNotFoundException;
import com.turbogoose.Flashcard.io.repository.DeckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DeckService {
    @Autowired
    private DeckRepository deckRepository;

    public DeckEntity createDeck(DeckEntity deck, String userId) {
        deck.setUserId(userId);
        deck.setCreationTime(LocalDateTime.now());
        deck.setLastModified(LocalDateTime.now());
        return deckRepository.save(deck);
    }

    public DeckEntity getDeck(int deckId) throws DeckNotFoundException {
        return deckRepository.findById(deckId).orElseThrow(DeckNotFoundException::new);
    }

    public DeckEntity updateDeck(DeckEntity deck) throws DeckNotFoundException {
        DeckEntity oldDeck = deckRepository.findById(deck.getDeckId()).orElseThrow(DeckNotFoundException::new);
        oldDeck.setTitle(deck.getTitle());
        oldDeck.setLastModified(LocalDateTime.now());
        return deckRepository.save(oldDeck);
    }

    public void deleteDeck(int deckId) {
        deckRepository.deleteById(deckId);
    }

    public boolean checkDeckBelongsToUser(int deckId, String userId) throws DeckNotFoundException {
        DeckEntity deck = deckRepository.findById(deckId).orElseThrow(DeckNotFoundException::new);
        return deck.getUserId().equals(userId);
    }
}
