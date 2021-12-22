import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";

const CreateDeckForm = ({createCallback}) => {
    const [deck, setDeck] = useState({title: ''})

    const createDeck = (event) => {
        event.preventDefault()
        if (deck.title) {
            createCallback(deck)
        }
        setDeck({title: ''})
    }

    return (
        <form>
            <MyInput
                type="text"
                placeholder="Deck title"
                value={deck.title}
                onChange={event => setDeck({...deck, title: event.target.value})}
            />
            <MyButton onClick={createDeck}>Create deck</MyButton>
        </form>
    );
};

export default CreateDeckForm;