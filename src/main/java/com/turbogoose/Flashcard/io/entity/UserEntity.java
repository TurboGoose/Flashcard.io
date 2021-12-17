package com.turbogoose.Flashcard.io.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    private Integer userId;
    private String name;
    private String email;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<DeckEntity> decks = new ArrayList<>();
}
