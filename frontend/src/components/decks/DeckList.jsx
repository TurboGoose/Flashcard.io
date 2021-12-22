import React from 'react';
import DeckItem from "./DeckItem";

const DeckList = ({title, decks, learn, browse, update, del}) => {

    if (!decks.length) {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>
                    No decks created yet
                </h1>
            </div>
        );
    }

    return (
        <div>
            <h1 style={{textAlign: "center"}}>{title}</h1>
            <div>
                {decks.map(deck =>
                    <DeckItem
                        card={deck}
                        learn={learn}
                        browse={browse}
                        update={update}
                        del={del}
                        key={deck.deckId}
                    />
                )}
            </div>
        </div>
    );
};

export default DeckList;