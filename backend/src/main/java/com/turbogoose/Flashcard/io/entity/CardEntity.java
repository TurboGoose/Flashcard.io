package com.turbogoose.Flashcard.io.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "cards")
public class CardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cardId;
    private String front;
    private String back;
    private LocalDateTime creationTime;
    private LocalDateTime lastModified;
    @ManyToOne
    @JoinColumn(name = "deck_id")
    private DeckEntity deck;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "card")
    private RepetitionInfoEntity repetition;
}
