create table users (
    user_id varchar(50) primary key,
    name varchar(50) not null,
    email varchar(50) not null
);

create table decks (
    deck_id serial primary key,
    user_id varchar(50) references users(user_id) not null,
    title varchar(100) not null,
    creation_time timestamp default current_timestamp not null,
    last_modified timestamp default current_timestamp not null
);

create table cards (
    card_id serial primary key,
    deck_id int references decks(deck_id) not null,
    front text not null,
    back text not null,
    creation_time timestamp default current_timestamp not null,
    last_modified timestamp default current_timestamp not null
);

create table repetition_info (
    repetition_info_id serial primary key,
    card_id int references cards(card_id),
    repetitions int default 0 not null,
    easiness float default 2.5 not null,
    interval integer default 1 not null,
    next_practice timestamp default current_timestamp not null
);


