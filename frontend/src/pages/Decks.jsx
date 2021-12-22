import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import DeckList from "../components/DeckList";
import DeckService from "../API/DeckService";
import {AuthContext} from "../context";
import MyModal from "../components/UI/modal/MyModal";
import CreateDeckForm from "../components/CreateDeckForm";
import MyButton from "../components/UI/button/MyButton";
import UpdateDeckForm from "../components/UpdateDeckForm";

const Decks = () => {
    const router = useHistory()
    const {user} = useContext(AuthContext)
    const [decks, setDecks] = useState([
        {userId: user.userId, deckId: 1, title: "Deck 1", cardsToLearn: 1, creationTime: Date.now(), lastModified: Date.now()},
        {userId: user.userId, deckId: 2, title: "Deck 2", cardsToLearn: 2, creationTime: Date.now(), lastModified: Date.now()},
        {userId: user.userId, deckId: 3, title: "Deck 3", cardsToLearn: 3, creationTime: Date.now(), lastModified: Date.now()},
    ])
    const [curDeck, setCurDeck] = useState({userId: 0, deckId: 0, title: "Default deck", cardsToLearn: 0, creationTime: Date.now(), lastModified: Date.now()})
    const [createModalVisible, setCreateModalVisible] = useState(false)
    const [updateModalVisible, setUpdateModalVisible] = useState(false)

    // const [fetchDecks, isLoading, error] = useFetching(async () => {
    //     const response = await DeckService.getUserDecks(user.userId)
    //     setDecks(response.data)
    // })
    // useEffect(async () => {
    //     const decks = await DeckService.getUserDecks(user.userId)
    //     setDecks(decks)
    // }, [])

    const learnDeck = deck => router.push(`decks/${deck.deckId}/learn`) //TODO: use hook useParams
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
            <MyModal visible={createModalVisible} setVisible={setCreateModalVisible}>
                <CreateDeckForm callback={createDeckModal}/>
            </MyModal>
            <MyModal visible={updateModalVisible} setVisible={setUpdateModalVisible}>
                <UpdateDeckForm updateCallback={updateDeckModal} deck={curDeck}/>
            </MyModal>
            <MyButton onClick={() => setCreateModalVisible(true)}>Create deck</MyButton>
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