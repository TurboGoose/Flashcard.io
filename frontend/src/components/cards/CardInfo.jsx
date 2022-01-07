import React from 'react';
import Button from "../UI/button/Button";

const CardInfo = ({closeCallback, card}) => {

    const closeWindow = (event) => {
        event.preventDefault()
        closeCallback()
    }

    return (
        <div>
            <div>
                <strong>{card.front}</strong>
                <br/>
                {card.back}
            </div>
            <Button onClick={closeWindow}>Close</Button>
        </div>
    );
};

export default CardInfo;