import React, {useState} from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";

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
            <Input
                type="text"
                placeholder="Deck title"
                value={deck.title}
                onChange={event => setDeck({...deck, title: event.target.value})}
            />
            <Button onClick={createDeck}>Create deck</Button>
        </form>
    );
};

export default CreateDeckForm;