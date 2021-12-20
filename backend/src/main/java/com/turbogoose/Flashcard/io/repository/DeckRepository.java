package com.turbogoose.Flashcard.io.repository;

import com.turbogoose.Flashcard.io.entity.DeckEntity;
import com.turbogoose.Flashcard.io.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface DeckRepository extends CrudRepository<DeckEntity, Integer> {
}
