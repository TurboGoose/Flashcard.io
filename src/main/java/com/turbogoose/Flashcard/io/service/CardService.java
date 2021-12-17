package com.turbogoose.Flashcard.io.service;

import com.turbogoose.Flashcard.io.entity.CardEntity;
import com.turbogoose.Flashcard.io.entity.DeckEntity;
import com.turbogoose.Flashcard.io.entity.RepetitionInfoEntity;
import com.turbogoose.Flashcard.io.exception.CardNotFoundException;
import com.turbogoose.Flashcard.io.exception.DeckNotFoundException;
import com.turbogoose.Flashcard.io.repository.CardRepository;
import com.turbogoose.Flashcard.io.repository.DeckRepository;
import com.turbogoose.Flashcard.io.repository.RepetitionInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CardService {
    @Autowired
    private DeckRepository deckRepository;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private RepetitionInfoRepository repetitionInfoRepository;

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

    public CardEntity updateCardDuringLearning(int cardId, int quality) throws CardNotFoundException {
        CardEntity card = cardRepository.findById(cardId).orElseThrow(CardNotFoundException::new);
        RepetitionInfoEntity newRep = RepetitionAlgorithmService.calculate(card.getRepetition(), quality);
        newRep.setCard(card);
        RepetitionInfoEntity savedRep = repetitionInfoRepository.save(newRep);
        card.setRepetition(savedRep);
        return cardRepository.save(card);
    }

    public void deleteCard(int cardId) {
        cardRepository.deleteById(cardId);
    }
}
