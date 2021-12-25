package com.turbogoose.Flashcard.io.repository;

import com.turbogoose.Flashcard.io.entity.DeckEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DeckRepository extends CrudRepository<DeckEntity, Integer> {
    List<DeckEntity> findAllByUserId(String userId);
}
