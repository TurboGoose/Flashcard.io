import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import Button from "../components/UI/button/Button";
import {useFetching} from "../hooks/useFetching";
import LearningService from "../API/LearningService";
import Loader from "../components/UI/loader/Loader";
import {useAuth0} from "@auth0/auth0-react";
import Wrapper from "../components/auth/Wrapper";
import "../styles/pages/Learn.css"

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
        <div className="learn_page">
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
                                <div className="cards_left_to_learn">
                                    Cards left to learn: {cards.length - index + 1}
                                </div>
                                <div className="question_area">
                                    <div>
                                        <div className="learning_card_front">
                                            <h2>{curCard.front}</h2>
                                        </div>
                                        {!isAnswerShowing &&
                                            <div className="show_answer_button">
                                                <Button onClick={() => setIsAnswerShowing(true)}>Show answer</Button>
                                            </div>
                                        }
                                    </div>
                                    {isAnswerShowing &&
                                        <div className="answer_area">
                                            <hr className="break_line"/>
                                            <div className="learning_card_back">
                                                {curCard.back}
                                            </div>
                                            <div className="quality">
                                                <h4>Evaluate your quality of answer:</h4>
                                                <div>
                                                    <Button onClick={factory(1)}>1</Button>
                                                    <Button onClick={factory(2)}>2</Button>
                                                    <Button onClick={factory(3)}>3</Button>
                                                    <Button onClick={factory(4)}>4</Button>
                                                    <Button onClick={factory(5)}>5</Button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                }
            </Wrapper>
        </div>
    );
};

export default Learn;