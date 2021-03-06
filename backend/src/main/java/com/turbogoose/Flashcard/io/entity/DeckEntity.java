package com.turbogoose.Flashcard.io.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "decks")
public class DeckEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer deckId;
    private String userId;
    private String title;
    private LocalDateTime creationTime;
    private LocalDateTime lastModified;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "deck")
    private List<CardEntity> cards = new ArrayList<>();
}
