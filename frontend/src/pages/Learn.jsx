import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import Button from "../components/UI/button/Button";
import {useFetching} from "../hooks/useFetching";
import LearningService from "../API/LearningService";
import Loader from "../components/UI/loader/Loader";
import {useAuth0} from "@auth0/auth0-react";

const Learn = () => {
    const router = useHistory()
    const {isAuthenticated, getAccessTokenSilently} = useAuth0()
    const {deckId} = useParams();
    const [accessToken, setAccessToken] = useState("")

    const [index, setIndex] = useState(1)
    const [cards, setCards] = useState([{cardId: 0, front: "", back: ""}])
    const [curCard, setCurCard] = useState({cardId: 0, front: "", back: ""})
    const [isAnswerShowing, setIsAnswerShowing] = useState(false)

    const [fetchCards, isLoading, error] = useFetching( async () => {
        if (!isAuthenticated) {
            return
        }
        const loadedAccessToken = await getAccessTokenSilently()
        const received = await LearningService.loadCardsToLearn(loadedAccessToken, deckId)
        setCards(received)
        setCurCard(received[0])
        setAccessToken(loadedAccessToken)
    })

    useEffect(() => {
        fetchCards()
    }, [])

    const factory = (q) => {
        return () => {
            setIndex(index + 1)
            const reviewData = {cardId: curCard.cardId, quality: q}
            LearningService.updateCard(accessToken, deckId, reviewData)
            if (index >= cards.length) {
                router.push("/decks")
                return
            }
            setCurCard(cards[index])
            setIsAnswerShowing(false)
        };
    }

    return (
        <div>
            <h1>Cards left to learn: {cards.length - index + 1}</h1>
            <br/>
            <strong>{curCard.front}</strong>
            <br/>
            <Button onClick={() => setIsAnswerShowing(true)}>Show answer</Button>
            <br/>
            {isAnswerShowing &&
                <div>
                    {error &&
                    <h1 style={{justifyContent: "center"}}>Error occurred: {error}</h1>
                    }
                    <div>{curCard.back}</div>
                    <br/>
                    <div>
                        <h2>Eval your quality of answer:</h2>
                        <br/>
                        <Button onClick={factory(1)}>1</Button>
                        <Button onClick={factory(2)}>2</Button>
                        <Button onClick={factory(3)}>3</Button>
                        <Button onClick={factory(4)}>4</Button>
                        <Button onClick={factory(5)}>5</Button>
                    </div>
                    {isLoading &&
                    <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
                    }
                </div>
            }

        </div>
    );
};

export default Learn;