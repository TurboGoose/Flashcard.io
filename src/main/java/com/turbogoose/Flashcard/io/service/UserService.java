package com.turbogoose.Flashcard.io.service;

import com.turbogoose.Flashcard.io.entity.UserEntity;
import com.turbogoose.Flashcard.io.exception.UserNotFoundException;
import com.turbogoose.Flashcard.io.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    public UserEntity getUser(int userId) throws UserNotFoundException {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }

    public void deleteUser(int userId) {
        userRepository.deleteById(userId);
    }
}
