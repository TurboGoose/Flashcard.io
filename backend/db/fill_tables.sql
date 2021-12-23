insert into users(user_id, name, email) values ('1', 'anton', 'anton123@email.com');
insert into users(user_id, name, email) values ('2', 'ilya', 'ilya123@email.com');

insert into decks(user_id, title) values (1, 'deck 1 for user 1');
insert into decks(user_id, title) values (2, 'deck 2 for user 1');
insert into decks(user_id, title) values (3, 'deck 3 for user 2');

insert into cards(deck_id, front, back) values (1, 'front 1', 'back1');
insert into cards(deck_id, front, back) values (1, 'front 1.2', 'back1.2');
insert into cards(deck_id, front, back) values (2, 'front 2', 'back2');
insert into cards(deck_id, front, back) values (3, 'front 3', 'back3');

insert into flashcardio.public.repetition_info(card_id) values (1);
insert into flashcardio.public.repetition_info(card_id) values (2);
insert into flashcardio.public.repetition_info(card_id) values (3);
insert into flashcardio.public.repetition_info(card_id) values (4);