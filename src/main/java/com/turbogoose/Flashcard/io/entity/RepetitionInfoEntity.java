package com.turbogoose.Flashcard.io.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "repetition_info")
public class RepetitionInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer repetitionInfoId;
    private int repetitions;
    private float easiness;
    private int interval;
    private LocalDateTime nextPractice;
    @OneToOne
    @JoinColumn(name = "card_id")
    private CardEntity card;
}
