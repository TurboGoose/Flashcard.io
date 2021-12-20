package com.turbogoose.Flashcard.io.service;

import com.turbogoose.Flashcard.io.entity.RepetitionInfoEntity;

import java.time.LocalDateTime;

public class RepetitionAlgorithmService {
    public static RepetitionInfoEntity calculate(RepetitionInfoEntity rep, int quality) {
        if (quality < 0 || quality > 5) {
            throw new IllegalArgumentException("quality value should be between 0 and 5");
        }

        int repetitions = rep.getRepetitions();
        float easiness = rep.getEasiness();
        int interval = rep.getInterval();

        easiness = (float) Math.max(1.3, easiness + 0.1 - (5.0 - quality) * (0.08 + (5.0 - quality) * 0.02));

        if (quality < 3) {
            repetitions = 0;
        } else {
            repetitions += 1;
        }

        if (repetitions <= 1) {
            interval = 1;
        } else if (repetitions == 2) {
            interval = 6;
        } else {
            interval = Math.round(interval * easiness);
        }

        LocalDateTime nextPractice = LocalDateTime.now().plusDays(interval);

        rep.setRepetitions(repetitions);
        rep.setEasiness(easiness);
        rep.setInterval(interval);
        rep.setNextPractice(nextPractice);
        return rep;
    }
}
