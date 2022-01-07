import React from 'react';
import Button from "../UI/button/Button";
import '../../styles/App.css';

const CardItem = ({card, browse, update, del}) => {
    return (
        <div className="card">
            <div>
                <strong>{card.front}</strong>
            </div>
            <div className={"card__btns"}>
                <Button onClick={() => browse(card)}>Browse</Button>
                <Button onClick={() => update(card)}>Update</Button>
                <Button onClick={() => del(card)}>Delete</Button>
            </div>
        </div>
    );
};

export default CardItem;