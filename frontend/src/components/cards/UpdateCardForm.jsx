import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";

const UpdateCardForm = ({updateCallback, card}) => {
    const [updatedCard, setUpdatedCard] = useState({...card, front: '', back: ''})

    const updateCard = (event) => {
        event.preventDefault()
        if (updatedCard.front) {
            updateCallback(updatedCard)
        }
        setUpdatedCard({...card, front: '', back: ''})
    }

    return (
        <form>
            <MyInput
                type="text"
                placeholder="Card front"
                value={updatedCard.front}
                onChange={event => setUpdatedCard({...card, front: event.target.value, back: updatedCard.back})}
            />
            <MyInput
                type="text"
                placeholder="Card back"
                value={updatedCard.back}
                onChange={event => setUpdatedCard({...updatedCard, front: updatedCard.front, back: event.target.value})}
            />
            <MyButton onClick={updateCard}>Update card</MyButton>
        </form>
    );
};

export default UpdateCardForm;