import React from 'react';
import Button from "../UI/button/Button";
import '../../styles/pages/components/decks/DeckItem.css';

const DeckItem = ({deck, learn, browse, update, del}) => {
    return (
        <div className="deck_item">
            <div className="info_block">
                <div className="title">
                    <strong>{deck.title}</strong>
                </div>
                <div className="cards_to_learn_count">
                    <strong>
                        {deck.cardsToLearn === 0 ?
                        "No cards left to learn" :
                        "Cards to learn: " + deck.cardsToLearn}
                    </strong>
                </div>
            </div>
            <div className="deck_buttons">
                <Button disabled={deck.cardsToLearn <= 0} onClick={() => learn(deck)}>Learn</Button>
                <Button onClick={() => browse(deck)}>Browse</Button>
                <Button onClick={() => update(deck)}>Update</Button>
                <Button onClick={() => del(deck)}>Delete</Button>
            </div>
        </div>
    );
};

export default DeckItem;