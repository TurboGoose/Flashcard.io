import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Modal from "../components/UI/modal/Modal";
import Button from "../components/UI/button/Button";
import CardService from "../API/CardService";
import CreateCardForm from "../components/cards/CreateCardForm";
import UpdateCardForm from "../components/cards/UpdateCardForm";
import CardList from "../components/cards/CardList";
import CardInfo from "../components/cards/CardInfo";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import {useAuth0} from "@auth0/auth0-react";
import Wrapper from "../components/auth/Wrapper";

const Cards = () => {
    const {isAuthenticated, getAccessTokenSilently} = useAuth0()
    const {deckId} = useParams();
    const [accessToken, setAccessToken] = useState("")
    const [cards, setCards] = useState([])
    const [curCard, setCurCard] = useState({cardId: 0, deckId, front: "", back: ""})
    const [createModalVisible, setCreateModalVisible] = useState(false)
    const [updateModalVisible, setUpdateModalVisible] = useState(false)
    const [browseModalVisible, setBrowseModalVisible] = useState(false)

    const [fetchCards, isLoading, error] = useFetching( async () => {
        if (!isAuthenticated) {
            return
        }
        const loadedAccessToken = await getAccessTokenSilently()
        const loadedCards = await CardService.getDeckCards(loadedAccessToken, deckId)
        setCards(loadedCards)
        setAccessToken(loadedAccessToken)
    })

    useEffect(() => {
        fetchCards()
    }, [])

    const browseCard = card => {
        setCurCard(card)
        setBrowseModalVisible(true)
    }
    const updateCard = card => {
        setUpdateModalVisible(true)
        setCurCard(card)
    }
    const deleteCard = async card => {
        await CardService.deleteCard(accessToken, deckId, card.cardId)
        setCards(cards.filter(c => c.cardId !== card.cardId))
    }
    const createCardModal = async card => {
        const newCard = await CardService.createCard(accessToken, deckId, card)
        setCards([...cards, newCard])
        setCreateModalVisible(false)
    }
    const updateCardModal = async card => {
        const newCard = await CardService.updateCard(accessToken, deckId, card.cardId, card)
        setCards(cards.map(c => c.cardId === newCard.cardId ? newCard : c))
        setUpdateModalVisible(false)
    }

    return (
        <div>
            <Wrapper>
                {error &&
                <h1 style={{justifyContent: "center"}}>Error occurred: {error}</h1>
                }
                {isLoading &&
                <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
                }
                {!error &&
                <div>
                    <Modal visible={createModalVisible} setVisible={setCreateModalVisible}>
                        <CreateCardForm createCallback={createCardModal}/>
                    </Modal>
                    <Modal visible={updateModalVisible} setVisible={setUpdateModalVisible}>
                        <UpdateCardForm updateCallback={updateCardModal} card={curCard}/>
                    </Modal>
                    <Modal visible={browseModalVisible} setVisible={setBrowseModalVisible}>
                        <CardInfo card={curCard} closeCallback={() => setBrowseModalVisible(false)}/>
                    </Modal>
                    <Button onClick={() => setCreateModalVisible(true)}>Create card</Button>

                    <CardList
                        title={"Cards"}
                        cards={cards}
                        browse={browseCard}
                        update={updateCard}
                        del={deleteCard}
                    />
                </div>
                }
            </Wrapper>
        </div>
    );
};

export default Cards;