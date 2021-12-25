import React from 'react';
import MyButton from "../UI/button/MyButton";
import '../../styles/App.css';

const DeckItem = ({deck, learn, browse, update, del}) => {
    return (
        <div className="deck">
            <div>
                <strong>{deck.title}</strong>
            </div>
            <div className={"deck__btns"}>
                <strong style={{color: "red"}}>{deck.cardsToLearn}</strong>
                <MyButton disabled={deck.cardsToLearn <= 0} onClick={() => learn(deck)}>Learn</MyButton>
                <MyButton onClick={() => browse(deck)}>Browse</MyButton>
                <MyButton onClick={() => update(deck)}>Update</MyButton>
                <MyButton onClick={() => del(deck)}>Delete</MyButton>
            </div>
        </div>
    );
};

export default DeckItem;