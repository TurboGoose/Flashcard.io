package com.turbogoose.Flashcard.io.controller;

import com.turbogoose.Flashcard.io.entity.UserEntity;
import com.turbogoose.Flashcard.io.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity createUserOrGetExisting(@RequestBody UserEntity user) {
        return ResponseEntity.ok(userService.createOrGetExistingUser(user));
    }
}
