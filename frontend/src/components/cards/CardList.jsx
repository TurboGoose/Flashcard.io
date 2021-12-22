import React from 'react';
import CardItem from "./CardItem";

const CardList = ({title, cards, browse, update, del}) => {

    if (!cards.length) {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>
                    Deck has no cards
                </h1>
            </div>
        );
    }

    return (
        <div>
            <h1 style={{textAlign: "center"}}>{title}</h1>
            <div>
                {cards.map(deck =>
                    <CardItem
                        card={deck}
                        browse={browse}
                        update={update}
                        del={del}
                    />
                )}
            </div>
        </div>
    );
};

export default CardList;