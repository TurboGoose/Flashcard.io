import axios from "axios";
import {backendHost} from "../router/HostInfo";

export default class DeckService {
    static async getUserDecks(accessToken) {
        const url = backendHost + `/decks`
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data;
    }

    static async createDeck(accessToken, deckData) {
        // deckData: {title}
        const url = backendHost + `/decks`
        const res = await axios.post(url, deckData,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data;
    }

    static async getDeck(accessToken, deckId) {
        const url = backendHost +`/decks/${deckId}`
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data;
    }

    static async updateDeck(accessToken, deckId, deckData) {
        // deckData: {title}
        const url = backendHost +`/decks/${deckId}`
        const res = await axios.put(url, deckData,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data;
    }

    static async deleteDeck(accessToken, deckId) {
        const url = backendHost +`/decks/${deckId}`
        await axios.delete(url,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }
}
