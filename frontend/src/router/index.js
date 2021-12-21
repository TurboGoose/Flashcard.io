import Login from "../pages/Login";
import Decks from "../pages/Decks";
import DeckItem from "../components/DeckItem";
import Learn from "../pages/Learn";

export const privateRoutes = [
    {path: "/decks", component: Decks, exact: true},
    {path: "/decks/:deckId/cards", component: DeckItem, exact: true},
    {path: "/decks/:deckId/learn", component: Learn, exact: true},
]

export const publicRoutes = [
    {path: "/login", component: Login, exact: true}
]