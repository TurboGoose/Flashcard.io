import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const CreateDeckForm = ({callback}) => {
    const [deck, setDeck] = useState({title: ''})

    const addNewDeck = (event) => {
        event.preventDefault()
        callback(deck)
        // setDeck({title: ''})
    }

    return (
        <form>
            <MyInput
                type="text"
                placeholder="Deck title"
                value={deck.title}
                onChange={event => setDeck({...deck, title: event.target.value})}
            />
            <MyButton onClick={addNewDeck}>Create deck</MyButton>
        </form>
    );
};

export default CreateDeckForm;