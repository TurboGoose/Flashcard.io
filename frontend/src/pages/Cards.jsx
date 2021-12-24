import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {UserContext} from "../context";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import CardService from "../API/CardService";
import CreateCardForm from "../components/cards/CreateCardForm";
import UpdateCardForm from "../components/cards/UpdateCardForm";
import CardList from "../components/cards/CardList";
import CardInfo from "../components/cards/CardInfo";
import {useFetching} from "../hooks/useFetching";
import MyLoader from "../components/loader/MyLoader";

const Cards = () => {
    const {user} = useContext(UserContext)
    const {deckId} = useParams()

    const [cards, setCards] = useState([])
    const [curCard, setCurCard] = useState({cardId: 0, deckId: deckId, front: "Def", back: "Def", nextPractice: Date.now(), creationTime: Date.now(), lastModified: Date.now()}) // insert default card here
    const [browseModalVisible, setBrowseModalVisible] = useState(false)
    const [createModalVisible, setCreateModalVisible] = useState(false)
    const [updateModalVisible, setUpdateModalVisible] = useState(false)

    const [fetchCards, isLoading, error] = useFetching( async () => {
        const loadedCards = await CardService.getDeckCards(user.userId, deckId)
        setCards(loadedCards)
    })

    useEffect(() => {
        fetchCards()
    }, [])

    const browseCard = card => {
        setCurCard(card)
        setBrowseModalVisible(true)
    }
    const deleteCard = async card => {
        await CardService.deleteCard(user.userId, deckId, card.cardId)
        setCards(cards.filter(c => c.cardId !== card.cardId))
    }
    const createCardModal = async card => {
        const newCard = await CardService.createCard(user.userId, deckId, card)
        setCards([...cards, newCard])
        setCreateModalVisible(false)
    }

    const updateCardModal = async card => {
        const newCard = await CardService.updateCard(user.userId, deckId, card.cardId, card)
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

            {error &&
            <h1 style={{justifyContent: "center"}}>Error occurred: {error}</h1>
            }
            <CardList
                title={"Cards"}
                cards={cards}
                browse={browseCard}
                update={updateCard}
                del={deleteCard}
            />
            {isLoading &&
            <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><MyLoader/></div>
            }
        </div>
    );
};

export default Cards;