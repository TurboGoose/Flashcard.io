import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import DeckList from "../components/DeckList";
import DeckService from "../api/DeckService";
import {AuthContext} from "../context";

const Decks = () => {
    const router = useHistory()
    const {user} = useContext(AuthContext)
    const [decks, setDecks] = useState([
        {userId: user.userId, deckId: 1, title: "Deck 1", cardsToLearn: 1, creationTime: Date.now(), lastModified: Date.now()},
        {userId: user.userId, deckId: 2, title: "Deck 2", cardsToLearn: 2, creationTime: Date.now(), lastModified: Date.now()},
        {userId: user.userId, deckId: 3, title: "Deck 3", cardsToLearn: 3, creationTime: Date.now(), lastModified: Date.now()},
    ])
    const [modalVisible, setModalVisible] = useState(false)

    // const [fetchDecks, isLoading, error] = useFetching(async () => {
    //     const response = await DeckService.getUserDecks(user.userId)
    //     setDecks(response.data)
    // })
    // useEffect(async () => {
    //     const decks = await DeckService.getUserDecks(user.userId)
    //     setDecks(decks)
    // }, [])

    const learnDeck = (deck) => router.push(`decks/${deck.deckId}/learn`) //TODO: use hook useParams
    const browseDeck = (deck) => router.push(`decks/${deck.deckId}/cards`)
    const updateDeck = (deck) => setModalVisible(true) //TODO: add modal window with update logic
    const deleteDeck = (deck) => {
        DeckService.deleteDeck(user.userId, deck.deckId)
        setDecks(decks.filter(d => d.deckId !== deck.deckId))
    }

    return (
        <div>
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