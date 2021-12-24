import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context";
import {useHistory, useParams} from "react-router-dom";
import MyButton from "../components/UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import LearningService from "../API/LearningService";
import MyLoader from "../components/loader/MyLoader";

const Learn = () => {
    const router = useHistory()
    const {user} = useContext(UserContext)
    const {deckId} = useParams();

    const [cards, setCards] = useState([{cardId: 0, front: "", back: ""}])

    const [index, setIndex] = useState(1)
    const [curCard, setCurCard] = useState({cardId: 0, front: "", back: ""})
    const [isAnswerShowing, setIsAnswerShowing] = useState(false)

    const [fetchCards, isLoading, error] = useFetching( async () => {
        const received = await LearningService.loadCardsToLearn(user.userId, deckId)
        setCards(received)
        setCurCard(received[0])
    })

    useEffect(() => {
        fetchCards()
    }, [])

    const factory = (q) => {
        return () => {
            setIndex(index + 1)
            const reviewData = {cardId: curCard.cardId, quality: q}
            LearningService.updateCard(user.userId, deckId, reviewData)
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
            <MyButton onClick={() => setIsAnswerShowing(true)}>Show answer</MyButton>
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
                        <MyButton onClick={factory(1)}>1</MyButton>
                        <MyButton onClick={factory(2)}>2</MyButton>
                        <MyButton onClick={factory(3)}>3</MyButton>
                        <MyButton onClick={factory(4)}>4</MyButton>
                        <MyButton onClick={factory(5)}>5</MyButton>
                    </div>
                    {isLoading &&
                    <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><MyLoader/></div>
                    }
                </div>
            }

        </div>
    );
};

export default Learn;