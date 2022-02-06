import React, {useEffect, useState} from 'react';
import Button from "../UI/button/Button";
import TextArea from "../UI/textarea/TextArea";

const UpdateCardForm = ({updateCallback, card, reset}) => {
    const [updatedCard, setUpdatedCard] = useState(card)
    useEffect(() => setUpdatedCard(card), [card, reset])

    const updateCard = (event) => {
        event.preventDefault()
        if (updatedCard.front && updatedCard.back) {
            updateCallback(updatedCard)
        }
        setUpdatedCard({...card, front: '', back: ''})
    }

    return (
        <form>
            <TextArea
                placeholder="Front side"
                rows="5"
                value={updatedCard.front}
                onChange={event => setUpdatedCard({...card, front: event.target.value, back: updatedCard.back})}
            />
            <TextArea
                placeholder="Back side"
                rows="5"
                value={updatedCard.back}
                onChange={event => setUpdatedCard({...updatedCard, front: updatedCard.front, back: event.target.value})}
            />
            <Button onClick={updateCard}>Update card</Button>
        </form>
    );
};

export default UpdateCardForm;