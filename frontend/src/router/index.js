import Login from "../pages/Login";
import Decks from "../pages/Decks";
import Learn from "../pages/Learn";
import Cards from "../pages/Cards";

export const privateRoutes = [
    {path: "/decks", component: Decks, exact: true},
    {path: "/decks/:deckId/cards", component: Cards, exact: true},
    {path: "/decks/:deckId/learn", component: Learn, exact: true},
]

export const publicRoutes = [
    {path: "/login", component: Login, exact: true}
]