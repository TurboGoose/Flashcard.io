package com.turbogoose.Flashcard.io.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.turbogoose.Flashcard.io.entity.CardEntity;
import com.turbogoose.Flashcard.io.entity.DeckEntity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DeckModel {
    private int deckId;
    private String userId;
    private String title;
    private int cardsToLearn;
    private List<CardModel> cards;
    private LocalDateTime creationTime;
    private LocalDateTime lastModified;

    public static DeckModel toDeckModel(DeckEntity deck) {
        DeckModel model = new DeckModel();
        model.setDeckId(deck.getDeckId());
        model.setUserId(deck.getUserId());
        model.setTitle(deck.getTitle());
        model.setCardsToLearn(calculateCardsToLearn(deck.getCards()));
        model.setCards(
                deck.getCards().stream()
                        .map(CardModel::toCardModel)
                        .collect(Collectors.toList())
        );
        model.setCreationTime(deck.getCreationTime());
        model.setLastModified(deck.getLastModified());
        return model;
    }

    private static int calculateCardsToLearn(List<CardEntity> cards) {
        int count = 0;
        if (cards != null) {
            LocalDateTime now = LocalDateTime.now();
            for (CardEntity card : cards) {
                if (card.getRepetition().getNextPractice().isBefore(now)) {
                    count++;
                }
            }
        }
        return count;
    }

    public DeckModel excludeCards() {
        cards = null;
        return this;
    }
}
