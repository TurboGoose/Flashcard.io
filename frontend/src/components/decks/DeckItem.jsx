import React from 'react';
import Button from "../UI/button/Button";
import '../../styles/App.css';

const DeckItem = ({deck, learn, browse, update, del}) => {
    return (
        <div className="deck">
            <div>
                <strong>{deck.title}</strong>
            </div>
            <div className={"deck__btns"}>
                <strong style={{color: "red"}}>{deck.cardsToLearn}</strong>
                <Button disabled={deck.cardsToLearn <= 0} onClick={() => learn(deck)}>Learn</Button>
                <Button onClick={() => browse(deck)}>Browse</Button>
                <Button onClick={() => update(deck)}>Update</Button>
                <Button onClick={() => del(deck)}>Delete</Button>
            </div>
        </div>
    );
};

export default DeckItem;