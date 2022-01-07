import React, {useState} from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";

const CreateCardForm = ({createCallback}) => {
    const [card, setCard] = useState({front: '', back: ''})

    const createCard = (event) => {
        event.preventDefault()
        if (card.front) {
            createCallback(card)
        }
        setCard({front: '', back: ''})
    }

    return (
        <form>
            <Input
                type="text"
                placeholder="Card front"
                value={card.front}
                onChange={event => setCard({...card, front : event.target.value})}
            />
            <Input
                type="text"
                placeholder="Card back"
                value={card.back}
                onChange={event => setCard({...card, back: event.target.value})}
            />
            <Button onClick={createCard}>Create card</Button>
        </form>
    );
};

export default CreateCardForm;