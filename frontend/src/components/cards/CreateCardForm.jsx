import React, {useEffect, useState} from 'react';
import Button from "../UI/button/Button";
import TextArea from "../UI/textarea/TextArea";

const CreateCardForm = ({createCallback, reset}) => {
    const [card, setCard] = useState({front: '', back: ''})

    useEffect(() => setCard({front: '', back: ''}), [reset])

    const createCard = (event) => {
        event.preventDefault()
        if (card.front) {
            createCallback(card)
        }
        setCard({front: '', back: ''})
    }

    return (
        <form>
            <TextArea
                placeholder="Front side"
                rows="5"
                value={card.front}
                onChange={event => setCard({...card, front : event.target.value})}
            />
            <TextArea
                placeholder="Back side"
                rows="5"
                value={card.back}
                onChange={event => setCard({...card, back: event.target.value})}
            />
            <Button onClick={createCard}>Create card</Button>
        </form>
    );
};

export default CreateCardForm;