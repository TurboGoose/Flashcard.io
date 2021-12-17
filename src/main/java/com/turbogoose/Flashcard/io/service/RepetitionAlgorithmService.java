package com.turbogoose.Flashcard.io.service;

import com.turbogoose.Flashcard.io.entity.RepetitionInfoEntity;

import java.time.LocalDateTime;

public class RepetitionAlgorithmService {
    public static RepetitionInfoEntity calculate(RepetitionInfoEntity info, int quality) {
        if (quality < 0 || quality > 5) {
            throw new IllegalArgumentException("quality value should be between 0 and 5");
        }

        int repetitions = info.getRepetitions();
        float easiness = info.getEasiness();
        int interval = info.getInterval();

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

        RepetitionInfoEntity newRepetition = new RepetitionInfoEntity();
        newRepetition.setRepetitions(repetitions);
        newRepetition.setEasiness(easiness);
        newRepetition.setInterval(interval);
        newRepetition.setNextPractice(nextPractice);
        return newRepetition;
    }
}
