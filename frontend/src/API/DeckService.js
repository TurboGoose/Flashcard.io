import axios from "axios";
import {backendHost} from "../router/HostInfo";

export default class DeckService {
    static async getUserDecks(userId) {
        const url = backendHost + '/decks'
        const res = await axios.get(url, {
            headers: {
                "userId": userId
            }
        })
        return res.data;
    }

    static async createDeck(userId, deckData) {
        // deckData: {title}
        const url = backendHost + `/decks`
        const res = await axios.post(url, deckData,{
            headers: {
                "userId": userId
            }
        })
        return res.data;
    }

    static async getDeck(userId, deckId) {
        const url = backendHost +`/decks/${deckId}`
        const res = await axios.get(url, {
            headers: {
                "userId": userId
            }
        })
        return res.data;
    }

    static async updateDeck(userId, deckId, deckData) {
        // deckData: {title}
        const url = backendHost +`/decks/${deckId}`
        const res = await axios.put(url, deckData,{
            headers: {
                "userId": userId
            }
        })
        return res.data;
    }

    static async deleteDeck(userId, deckId) {
        const url = backendHost +`/decks/${deckId}`
        await axios.delete(url,{
            headers: {
                "userId": userId
            }
        })
    }
}
