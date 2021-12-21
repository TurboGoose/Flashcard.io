import React, {useContext, useEffect, useState} from 'react';
import DeckFilter from "../components/DeckFilter";
import {useHistory} from "react-router-dom";
import DeckList from "../components/DeckList";
import DeckService from "../api/DeckService";
import {AuthContext} from "../context";

const Decks = () => {
    const router = useHistory()
    const {userId} = useContext(AuthContext)
    const [filter, setFilter] = useState({sort: "", searchQuery: ""})
    const [decks, setDecks] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        setDecks(DeckService.getUserDecks(userId))
    }, [])

    const learnDeck = (deck) => router.push(`decks/${deck.deckId}/learn`) //TODO: pass deckId somehow?
    const browseDeck = (deck) => router.push(`decks/${deck.deckId}/cards`) // same
    const updateDeck = (deck) => setModalVisible(true) //TODO: add modal window with update logic
    const deleteDeck = (deck) => {
        DeckService.deleteDeck(userId, deck.deckId)
        setDecks(decks.filter(d => d.id !== deck.deckId))
    }

    return (
        <div>
            <DeckFilter filter={filter} setFilter={setFilter}/>
            <DeckList
                title={"Decks"}
                decks={decks}
                learn={learnDeck}
                browse={browseDeck}
                update={updateDeck}
                del={deleteDeck}
            />
        </div>
    );
};

export default Decks;