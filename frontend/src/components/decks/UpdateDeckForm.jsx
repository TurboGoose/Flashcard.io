import React, {useEffect, useState} from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";

const UpdateDeckForm = ({updateCallback, deck}) => {
    const [updatedDeck, setUpdatedDeck] = useState(deck)
    useEffect(() => setUpdatedDeck(deck), [deck])

    const updateDeck = (event) => {
        event.preventDefault()
        if (updatedDeck.title) {
            updateCallback(updatedDeck)
        }
        setUpdatedDeck({...deck, title: ''})
    }

    return (
        <form>
            <Input
                type="text"
                placeholder="New title"
                value={updatedDeck.title}
                onChange={event => setUpdatedDeck({...deck, title: event.target.value})}
            />
            <Button onClick={updateDeck}>Update deck</Button>
        </form>
    );
};

export default UpdateDeckForm;