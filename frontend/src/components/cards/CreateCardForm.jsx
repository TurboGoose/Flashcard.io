import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";

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
            <MyInput
                type="text"
                placeholder="Card front"
                value={card.front}
                onChange={event => setCard({...card, front : event.target.value})}
            />
            <MyInput
                type="text"
                placeholder="Card back"
                value={card.back}
                onChange={event => setCard({...card, back: event.target.value})}
            />
            <MyButton onClick={createCard}>Create card</MyButton>
        </form>
    );
};

export default CreateCardForm;