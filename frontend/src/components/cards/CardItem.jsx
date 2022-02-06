import React from 'react';
import Button from "../UI/button/Button";
import '../../styles/components/cards/CardItem.css';

const CardItem = ({card, browse, update, del}) => {
    return (
        <div className="card_item">
            <div className="front">
                <strong>{card.front}</strong>
            </div>
            <div className="card_buttons">
                <Button onClick={() => browse(card)}>Browse</Button>
                <Button onClick={() => update(card)}>Update</Button>
                <Button onClick={() => del(card)}>Delete</Button>
            </div>
        </div>
    );
};

export default CardItem;