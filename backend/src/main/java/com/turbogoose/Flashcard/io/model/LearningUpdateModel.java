package com.turbogoose.Flashcard.io.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LearningUpdateModel {
    private int cardId;
    private int quality;
}
