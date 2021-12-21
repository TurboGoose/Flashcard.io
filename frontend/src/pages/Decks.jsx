import React, {useContext, useEffect, useState} from 'react';
import DeckFilter from "../components/DeckFilter";
import {useHistory} from "react-router-dom";
import DeckList from "../components/DeckList";
import DeckService from "../api/DeckService";
import {AuthContext} from "../context";
import {useFetching} from "../hooks/useFetching";

const Decks = () => {
    const router = useHistory()
    const {user} = useContext(AuthContext)
    const [filter, setFilter] = useState({sort: "", searchQuery: ""})
    const [decks, setDecks] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    // const [fetchDecks, isLoading, error] = useFetching(async () => {
    //     const response = await DeckService.getUserDecks(user.userId)
    //     setDecks(response.data)
    // })

    useEffect(async () => {
        const decks = await DeckService.getUserDecks(user.userId)
        setDecks(decks)
    }, [])

    const learnDeck = (deck) => router.push(`decks/${deck.deckId}/learn`) //TODO: use hook useParams
    const browseDeck = (deck) => router.push(`decks/${deck.deckId}/cards`)
    const updateDeck = (deck) => setModalVisible(true) //TODO: add modal window with update logic
    const deleteDeck = (deck) => {
        DeckService.deleteDeck(user.userId, deck.deckId)
        setDecks(decks.filter(d => d.deckId !== deck.deckId))
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