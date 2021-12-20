package com.turbogoose.Flashcard.io.repository;

import com.turbogoose.Flashcard.io.entity.CardEntity;
import org.springframework.data.repository.CrudRepository;

public interface CardRepository extends CrudRepository<CardEntity, Integer> {
}
