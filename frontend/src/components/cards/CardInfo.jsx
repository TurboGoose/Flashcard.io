import React from 'react';
import MyButton from "../UI/button/MyButton";

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
            <MyButton onClick={closeWindow}>Close</MyButton>
        </div>
    );
};

export default CardInfo;