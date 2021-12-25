package com.turbogoose.Flashcard.io.service;

import com.turbogoose.Flashcard.io.entity.DeckEntity;
import com.turbogoose.Flashcard.io.entity.UserEntity;
import com.turbogoose.Flashcard.io.exception.DeckNotFoundException;
import com.turbogoose.Flashcard.io.exception.UserNotFoundException;
import com.turbogoose.Flashcard.io.repository.DeckRepository;
import com.turbogoose.Flashcard.io.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DeckService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DeckRepository deckRepository;

    public DeckEntity createDeck(DeckEntity deck, String userId) throws UserNotFoundException {
        UserEntity user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        return createDeck(deck, user);
    }

    public DeckEntity createDeck(DeckEntity deck, UserEntity user) {
        deck.setUser(user);
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
}
