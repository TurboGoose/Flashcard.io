import React, {useContext, useState} from 'react';
import {useParams} from "react-router-dom";
import {AuthContext} from "../context";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import CardService from "../API/CardService";
import CreateCardForm from "../components/cards/CreateCardForm";
import UpdateCardForm from "../components/cards/UpdateCardForm";
import CardList from "../components/cards/CardList";
import CardInfo from "../components/cards/CardInfo";

const Cards = () => {
    const userId = useContext(AuthContext).user.userId
    const deckId = useParams().deckId

    const [cards, setCards] = useState([
        {cardId: 1, deckId: deckId, front: "front 1", back: "back 1", nextPractice: Date.now(), creationTime: Date.now(), lastModified: Date.now()},
        {cardId: 2, deckId: deckId, front: "front 2", back: "back 2", nextPractice: Date.now(), creationTime: Date.now(), lastModified: Date.now()},
        {cardId: 3, deckId: deckId, front: "front 3", back: "back 3", nextPractice: Date.now(), creationTime: Date.now(), lastModified: Date.now()}
    ])
    const [curCard, setCurCard] = useState({cardId: 0, deckId: deckId, front: "Def", back: "Def", nextPractice: Date.now(), creationTime: Date.now(), lastModified: Date.now()}) // insert default card here
    const [browseModalVisible, setBrowseModalVisible] = useState(false)
    const [createModalVisible, setCreateModalVisible] = useState(false)
    const [updateModalVisible, setUpdateModalVisible] = useState(false)

    // const [fetchDecks, isLoading, error] = useFetching(async () => {
    //     const response = await DeckService.getUserDecks(userId)
    //     setDecks(response.data)
    // })
    // useEffect(async () => {
    //     const decks = await DeckService.getUserDecks(userId)
    //     setDecks(decks)
    // }, [])

    const browseCard = card => {
        setCurCard(card)
        setBrowseModalVisible(true)
    }
    const deleteCard = async card => {
        // await CardService.deleteCard(userId, deckId, card.cardId)
        setCards(cards.filter(c => c.cardId !== card.cardId))
    }
    const createCardModal = async card => {
        // const newCard = await DeckService.createDeck(userId, card)
        const newCard = card
        setCards([...cards, newCard])
        setCreateModalVisible(false)
    }

    const updateCardModal = async card => {
        // const newCard = await CardService.updateCard(userId, deckId, card.cardId, card)
        const newCard = card
        setCards(
            cards.map(c =>
                c.cardId === newCard.cardId
                    ? newCard
                    : c
            ))
        setUpdateModalVisible(false)
    }

    const updateCard = card => {
        setUpdateModalVisible(true)
        setCurCard(card)
    }

    return (
        <div>
            <MyModal visible={createModalVisible} setVisible={setCreateModalVisible}>
                <CreateCardForm createCallback={createCardModal}/>
            </MyModal>
            <MyModal visible={updateModalVisible} setVisible={setUpdateModalVisible}>
                <UpdateCardForm updateCallback={updateCardModal} card={curCard}/>
            </MyModal>
            <MyModal visible={browseModalVisible} setVisible={setBrowseModalVisible}>
                <CardInfo card={curCard} closeCallback={() => setBrowseModalVisible(false)}/>
            </MyModal>

            <MyButton onClick={() => setCreateModalVisible(true)}>Create card</MyButton>
            <CardList
                title={"Cards"}
                cards={cards}
                browse={browseCard}
                update={updateCard}
                del={deleteCard}
            />
        </div>
    );
};

export default Cards;