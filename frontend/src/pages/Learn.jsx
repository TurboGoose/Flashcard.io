import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context";
import {useHistory, useParams} from "react-router-dom";
import MyButton from "../components/UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import LearningService from "../API/LearningService";

const Learn = () => {
    const router = useHistory()
    const {userId} = useContext(UserContext).user
    const deckId = useParams().deckId;

    const [cards, setCards] = useState([  // delete this
        {cardId: 1, deckId: deckId, front: "front 1", back: "back 1", nextPractice: Date.now(), creationTime: Date.now(), lastModified: Date.now()},
        {cardId: 2, deckId: deckId, front: "front 2", back: "back 2", nextPractice: Date.now(), creationTime: Date.now(), lastModified: Date.now()},
        {cardId: 3, deckId: deckId, front: "front 3", back: "back 3", nextPractice: Date.now(), creationTime: Date.now(), lastModified: Date.now()}
    ])

    const [index, setIndex] = useState(1)
    const [curCard, setCurCard] = useState(cards[0])
    const [isAnswerShowing, setIsAnswerShowing] = useState(false)

    const [fetchCards, isLoading, error] = useFetching( async () => {
        const response = await LearningService.loadCardsToLearn(userId, deckId)
        setCards(response.data)
    })

    // useEffect(() => {
    //     fetchCards()
    // }, [])

    const factory = (q) => {
        return () => {
            setIndex(index + 1)
            const reviewData = {cardId: curCard.cardId, quality: q}
            // LearningService.updateCard(userId, deckId, reviewData)
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
                </div>
            }

        </div>
    );
};

export default Learn;