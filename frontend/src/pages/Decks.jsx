import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import DeckList from "../components/decks/DeckList";
import DeckService from "../API/DeckService";
import {AuthContext} from "../context";
import MyModal from "../components/UI/modal/MyModal";
import CreateDeckForm from "../components/decks/CreateDeckForm";
import MyButton from "../components/UI/button/MyButton";
import UpdateDeckForm from "../components/decks/UpdateDeckForm";
import {useFetching} from "../hooks/useFetching";
import MyLoader from "../components/loader/MyLoader";
import {useAuth0} from "@auth0/auth0-react";
import Profile from "../auth/profile";

const Decks = () => {
    const router = useHistory()
    const {userId} = useContext(AuthContext).user
    const [decks, setDecks] = useState([ // delete this
        {userId: userId, deckId: 1, title: "Deck 1", cardsToLearn: 1, creationTime: Date.now(), lastModified: Date.now()},
        {userId: userId, deckId: 2, title: "Deck 2", cardsToLearn: 2, creationTime: Date.now(), lastModified: Date.now()},
        {userId: userId, deckId: 3, title: "Deck 3", cardsToLearn: 3, creationTime: Date.now(), lastModified: Date.now()},
    ])
    const [curDeck, setCurDeck] = useState({userId: 0, deckId: 0, title: "Default deck", cardsToLearn: 0, creationTime: Date.now(), lastModified: Date.now()})
    const [createModalVisible, setCreateModalVisible] = useState(false)
    const [updateModalVisible, setUpdateModalVisible] = useState(false)

    const [fetchDecks, isLoading, error] = useFetching(async () => {
        const response = await DeckService.getUserDecks(userId)
        setDecks(response.data)
    })

    // useEffect(() => {
    //     fetchDecks()
    // }, [])

    const learnDeck = deck => router.push(`decks/${deck.deckId}/learn`)
    const browseDeck = deck => router.push(`decks/${deck.deckId}/cards`)
    const deleteDeck = async deck => {
        // await DeckService.deleteDeck(userId, deck.deckId)
        setDecks(decks.filter(d => d.deckId !== deck.deckId))
    }
    const createDeckModal = async deck => {
        // const newDeck = await DeckService.createDeck(userId, deck)
        const newDeck = deck
        setDecks([...decks, newDeck])
        setCreateModalVisible(false)
    }
    const updateDeckModal = async deck => {
        // const newDeck = await DeckService.updateDeck(userId, deck.deckId, deck)
        const newDeck = deck
        setDecks(
            decks.map(d =>
                d.deckId === newDeck.deckId
                    ? newDeck
                    : d
            ))
        setUpdateModalVisible(false)
    }

    const updateDeck = deck => {
        setUpdateModalVisible(true)
        setCurDeck(deck)
    }



    return (
        <div>
            <MyModal visible={createModalVisible} setVisible={setCreateModalVisible}>
                <CreateDeckForm createCallback={createDeckModal}/>
            </MyModal>
            <MyModal visible={updateModalVisible} setVisible={setUpdateModalVisible}>
                <UpdateDeckForm updateCallback={updateDeckModal} deck={curDeck}/>
            </MyModal>
            <MyButton onClick={() => setCreateModalVisible(true)}>Create deck</MyButton>
            <Profile/>
            {error &&
            <h1 style={{justifyContent: "center"}}>Error occurred: {error}</h1>
            }

            <DeckList
                title={"Decks"}
                decks={decks}
                learn={learnDeck}
                browse={browseDeck}
                update={updateDeck}
                del={deleteDeck}
            />

            {isLoading &&
            <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><MyLoader/></div>
            }
        </div>
    );
};

export default Decks;