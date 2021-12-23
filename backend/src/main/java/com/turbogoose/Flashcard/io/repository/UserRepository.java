package com.turbogoose.Flashcard.io.repository;

import com.turbogoose.Flashcard.io.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, String> {
}
