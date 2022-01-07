import React, {useEffect, useState} from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";

const UpdateCardForm = ({updateCallback, card}) => {
    const [updatedCard, setUpdatedCard] = useState(card)
    useEffect(() => setUpdatedCard(card), [card])

    const updateCard = (event) => {
        event.preventDefault()
        if (updatedCard.front && updatedCard.back) {
            updateCallback(updatedCard)
        }
        setUpdatedCard({...card, front: '', back: ''})
    }

    return (
        <form>
            <Input
                type="text"
                placeholder="Card front"
                value={updatedCard.front}
                onChange={event => setUpdatedCard({...card, front: event.target.value, back: updatedCard.back})}
            />
            <Input
                type="text"
                placeholder="Card back"
                value={updatedCard.back}
                onChange={event => setUpdatedCard({...updatedCard, front: updatedCard.front, back: event.target.value})}
            />
            <Button onClick={updateCard}>Update card</Button>
        </form>
    );
};

export default UpdateCardForm;