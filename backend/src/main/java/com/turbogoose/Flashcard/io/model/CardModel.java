package com.turbogoose.Flashcard.io.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.turbogoose.Flashcard.io.entity.CardEntity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CardModel {
    private int cardId;
    private int deckId;
    private String front;
    private String back;
    private LocalDateTime nextPractice;
    private LocalDateTime creationTime;
    private LocalDateTime lastModified;

    public static CardModel toCardModel(CardEntity card) {
        CardModel model = new CardModel();
        model.setCardId(card.getCardId());
        model.setDeckId(card.getDeck().getDeckId());
        model.setFront(card.getFront());
        model.setBack(card.getBack());
        model.setNextPractice(card.getRepetition().getNextPractice());
        model.setCreationTime(card.getCreationTime());
        model.setLastModified(card.getLastModified());
        return model;
    }
}
