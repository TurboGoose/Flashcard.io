import React from 'react';
import MyButton from "../UI/button/MyButton";
import '../../styles/App.css';

const CardItem = ({card, browse, update, del}) => {
    return (
        <div className="card">
            <div>
                <strong>{card.front}</strong>
            </div>
            <div className={"card__btns"}>
                <MyButton onClick={() => browse(card)}>Browse</MyButton>
                <MyButton onClick={() => update(card)}>Update</MyButton>
                <MyButton onClick={() => del(card)}>Delete</MyButton>
            </div>
        </div>
    );
};

export default CardItem;