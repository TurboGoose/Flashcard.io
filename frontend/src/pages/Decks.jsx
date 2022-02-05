import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import DeckList from "../components/decks/DeckList";
import DeckService from "../API/DeckService";
import Modal from "../components/UI/modal/Modal";
import CreateDeckForm from "../components/decks/CreateDeckForm";
import Button from "../components/UI/button/Button";
import UpdateDeckForm from "../components/decks/UpdateDeckForm";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import Wrapper from "../components/auth/Wrapper";
import {useAuth0} from "@auth0/auth0-react";
import "../styles/pages/Decks.css"

const Decks = () => {
    const router = useHistory()
    const {isAuthenticated, getAccessTokenSilently} = useAuth0()
    const [accessToken, setAccessToken] = useState("")
    const [decks, setDecks] = useState([])
    const [curDeck, setCurDeck] = useState({deckId: 0, userId: 0, title: "", cadsToLearn: 0, creationTime: Date.now(), lastModified: Date.now()})
    const [createModalVisible, setCreateModalVisible] = useState(false)
    const [updateModalVisible, setUpdateModalVisible] = useState(false)

    const [fetch, isLoading, error] = useFetching(async () => {
        if (!isAuthenticated) {
            return
        }
        const loadedAccessToken = await getAccessTokenSilently()
        const loadedDecks = await DeckService.getUserDecks(loadedAccessToken)
        setDecks(loadedDecks)
        setAccessToken(loadedAccessToken)
    })

    useEffect(() => {
        fetch()
    }, [])

    const browseDeck = deck => {
        router.push(`decks/${deck.deckId}/cards`)
    }
    const learnDeck = deck => {
        router.push(`decks/${deck.deckId}/learn`)
    }
    const updateDeck = deck => {
        setCurDeck(deck)
        setUpdateModalVisible(true)
    }
    const deleteDeck = deck => {
        DeckService.deleteDeck(accessToken, deck.deckId)
        setDecks(decks.filter(d => d.deckId !== deck.deckId))
    }
    const createDeckModal = async deck => {
        const newDeck = await DeckService.createDeck(accessToken, deck)
        setDecks([...decks, newDeck])
        setCreateModalVisible(false)
    }
    const updateDeckModal = async deck => {
        const newDeck = await DeckService.updateDeck(accessToken, deck.deckId, deck)
        setDecks(decks.map(d => d.deckId === newDeck.deckId ? newDeck : d))
        setUpdateModalVisible(false)
    }

    return (
        <div className="deck_page">
            <Wrapper>
                {error &&
                    <div className="error">
                        <h1>An error occurred</h1>
                    </div>
                }
                {!error &&
                    <div>
                        {isLoading &&
                            <div className="loader">
                                <Loader/>
                            </div>
                        }
                        {!isLoading &&
                            <div>
                                <Modal visible={createModalVisible} setVisible={setCreateModalVisible}>
                                    <CreateDeckForm createCallback={createDeckModal}/>
                                </Modal>
                                <Modal visible={updateModalVisible} setVisible={setUpdateModalVisible}>
                                    <UpdateDeckForm updateCallback={updateDeckModal} deck={curDeck}/>
                                </Modal>
                                <Button onClick={() => setCreateModalVisible(true)}>Create deck</Button>
                                <DeckList
                                    title={"Decks"}
                                    decks={decks}
                                    learn={learnDeck}
                                    browse={browseDeck}
                                    update={updateDeck}
                                    del={deleteDeck}
                                />
                            </div>
                        }

                    </div>
                }
            </Wrapper>
        </div>
    );
};

export default Decks;