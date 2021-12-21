import React from 'react';
import MyButton from "./UI/button/MyButton";

const DeckItem = ({deck, learn, browse, update, del}) => {
    return (
        <div className="deck">
            <div className="deck__content">
                <strong>{deck.title}</strong>
            </div>
            <div className={"post__btns"}>
                <MyButton onClick={() => learn(deck)}>Learn</MyButton>
                <MyButton onClick={() => browse(deck)}>Browse</MyButton>
                <MyButton onClick={() => update(deck)}>Update</MyButton>
                <MyButton onClick={() => del(deck)}>Delete</MyButton>
            </div>
        </div>
    );
};

export default DeckItem;