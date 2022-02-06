import React from 'react';
import CardItem from "./CardItem";
import "../../styles/components/cards/CardList.css"

const CardList = ({title, cards, browse, update, del}) => {

    if (!cards.length) {
        return (
            <div>
                <h1>
                    Deck has no cards yet
                </h1>
            </div>
        );
    }

    return (
        <div>
            <h1>{title}</h1>
            <div>
                {cards.map(card =>
                    <CardItem
                        card={card}
                        browse={browse}
                        update={update}
                        del={del}
                        key={card.cardId}
                    />
                )}
            </div>
        </div>
    );
};

export default CardList;