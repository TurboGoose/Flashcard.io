package com.turbogoose.Flashcard.io.service;

import com.turbogoose.Flashcard.io.entity.CardEntity;
import com.turbogoose.Flashcard.io.entity.RepetitionInfoEntity;
import com.turbogoose.Flashcard.io.repository.RepetitionInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RepetitionInfoService {
    @Autowired
    private RepetitionInfoRepository repository;

    public RepetitionInfoEntity createDefault(CardEntity card) {
        RepetitionInfoEntity rep = new RepetitionInfoEntity();
        rep.setRepetitions(0);
        rep.setInterval(1);
        rep.setEasiness(2.5f);
        rep.setCard(card);
        rep.setNextPractice(LocalDateTime.now());
        return repository.save(rep);
    }
}
