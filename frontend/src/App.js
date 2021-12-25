import {useState} from "react";
import {AccessTokenContext, DeckContext} from "./context";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import MyNavbar from "./components/UI/navbar/MyNavbar";

function App() {
    const [deck, setDeck] = useState({userId: 0, deckId: 0, title: "Default deck", cardsToLearn: 0, creationTime: Date.now(), lastModified: Date.now()})
    const [accessToken, setAccessToken] = useState()

    return (
        <AccessTokenContext.Provider value={{accessToken, setAccessToken}}>
            <DeckContext.Provider value={{deck, setDeck}}>
                <BrowserRouter>
                    <MyNavbar/>
                    <AppRouter/>
                </BrowserRouter>
            </DeckContext.Provider>
        </AccessTokenContext.Provider>
  );
}

export default App;
