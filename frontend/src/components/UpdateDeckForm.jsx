import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const UpdateDeckForm = ({updateCallback, deck}) => {
    const [updatedDeck, setUpdatedDeck] = useState({...deck, title: ''})

    const updateDeck = (event) => {
        event.preventDefault()
        updateCallback(updatedDeck)
        setUpdatedDeck({...deck, title: ''})
    }

    return (
        <form>
            <MyInput
                type="text"
                placeholder="New title"
                value={updatedDeck.title}
                onChange={event => setUpdatedDeck({...deck, title: event.target.value})}
            />
            <MyButton onClick={updateDeck}>Update deck</MyButton>
        </form>
    );
};

export default UpdateDeckForm;