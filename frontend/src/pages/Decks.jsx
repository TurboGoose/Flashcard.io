import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import DeckList from "../components/decks/DeckList";
import DeckService from "../API/DeckService";
import {UserContext} from "../context";
import MyModal from "../components/UI/modal/MyModal";
import CreateDeckForm from "../components/decks/CreateDeckForm";
import MyButton from "../components/UI/button/MyButton";
import UpdateDeckForm from "../components/decks/UpdateDeckForm";
import {useFetching} from "../hooks/useFetching";
import MyLoader from "../components/loader/MyLoader";
import Profile from "../components/auth/Profile";
import Wrapper from "../components/auth/Wrapper";
import {useAuth0} from "@auth0/auth0-react";
import UserService from "../API/UserService";

const Decks = () => {
    const router = useHistory()
    const {user: externalUser, isAuthenticated} = useAuth0()
    const {user, setUser} = useContext(UserContext)
    const [decks, setDecks] = useState([])
    const [curDeck, setCurDeck] = useState({userId: 0, deckId: 0, title: "Default deck", cardsToLearn: 0, creationTime: Date.now(), lastModified: Date.now()})
    const [createModalVisible, setCreateModalVisible] = useState(false)
    const [updateModalVisible, setUpdateModalVisible] = useState(false)

    const [fetch, isLoading, error] = useFetching(async () => {
        if (!isAuthenticated) {
            return
        }
        const newUser = {
            userId: externalUser.sub,
            name: externalUser.name,
            email: externalUser.email
        }
        const loadedUser = await UserService.createUser(newUser)
        setUser(loadedUser)
        const loadedDecks = await DeckService.getUserDecks(loadedUser.userId)
        setDecks(loadedDecks)
    })

    useEffect(() => {
        fetch()
    }, [])

    const learnDeck = deck => router.push(`decks/${deck.deckId}/learn`)
    const browseDeck = deck => router.push(`decks/${deck.deckId}/cards`)
    const deleteDeck = async deck => {
        await DeckService.deleteDeck(user.userId, deck.deckId)
        setDecks(decks.filter(d => d.deckId !== deck.deckId))
    }
    const createDeckModal = async deck => {
        const newDeck = await DeckService.createDeck(user.userId, deck)
        setDecks([...decks, newDeck])
        setCreateModalVisible(false)
    }
    const updateDeckModal = async deck => {
        const newDeck = await DeckService.updateDeck(user.userId, deck.deckId, deck)
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
            <Wrapper>
                <MyModal visible={createModalVisible} setVisible={setCreateModalVisible}>
                    <CreateDeckForm createCallback={createDeckModal}/>
                </MyModal>
                <MyModal visible={updateModalVisible} setVisible={setUpdateModalVisible}>
                    <UpdateDeckForm updateCallback={updateDeckModal} deck={curDeck}/>
                </MyModal>
                <MyButton onClick={() => setCreateModalVisible(true)}>Create deck</MyButton>
                <Profile/>
                <h4>{JSON.stringify(useContext(UserContext).user)}</h4>
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
            </Wrapper>
        </div>
    );
};

export default Decks;