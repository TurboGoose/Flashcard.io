import React from 'react';
import MyButton from "../UI/button/MyButton";
import '../../styles/App.css';

const DeckItem = ({card, learn, browse, update, del}) => {
    return (
        <div className="deck">
            <div>
                <strong>{card.title}</strong>
            </div>
            <div className={"deck__btns"}>
                <MyButton onClick={() => learn(card)}>Learn</MyButton>
                <MyButton onClick={() => browse(card)}>Browse</MyButton>
                <MyButton onClick={() => update(card)}>Update</MyButton>
                <MyButton onClick={() => del(card)}>Delete</MyButton>
            </div>
        </div>
    );
};

export default DeckItem;