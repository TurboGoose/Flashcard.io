import React from 'react';
import DeckItem from "./DeckItem";
import "../../styles/components/decks/DeckList.css"

const DeckList = ({title, decks, learn, browse, update, del}) => {

    if (!decks.length) {
        return (
            <div>
                <h1>
                    No decks created yet
                </h1>
            </div>
        );
    }

    return (
        <div>
            <h1>{title}</h1>
            <div>
                {decks.map(deck =>
                    <DeckItem
                        deck={deck}
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