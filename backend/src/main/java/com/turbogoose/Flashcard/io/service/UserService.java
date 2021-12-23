package com.turbogoose.Flashcard.io.service;

import com.turbogoose.Flashcard.io.entity.UserEntity;
import com.turbogoose.Flashcard.io.exception.DeckNotFoundException;
import com.turbogoose.Flashcard.io.exception.UserNotFoundException;
import com.turbogoose.Flashcard.io.repository.DeckRepository;
import com.turbogoose.Flashcard.io.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DeckRepository deckRepository;

    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    public UserEntity getUser(String userId) throws UserNotFoundException {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }

    public UserEntity createOrGetExistingUser(UserEntity user) {
        try {
            return getUser(user.getUserId());
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return createUser(user);
        }
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    public boolean isDeckBelongsToUser(String userId, int deckId) throws DeckNotFoundException {
        String deckOwnerId = deckRepository.findById(deckId).orElseThrow(DeckNotFoundException::new).getUser().getUserId();
        return deckOwnerId.equals(userId);
    }
}
