import React from 'react';
import Button from "../UI/button/Button";
import "../../styles/components/cards/CardInfo.css"

const CardInfo = ({closeCallback, card}) => {

    const closeWindow = (event) => {
        event.preventDefault()
        closeCallback()
    }

    return (
        <div className="info">
            <div className="front">
                <h3>{card.front}</h3>
            </div>
            <div className="back">
                {card.back}
            </div>
            <Button onClick={closeWindow}>Close</Button>
        </div>
    );
};

export default CardInfo;