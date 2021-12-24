import axios from "axios";
import {backendHost} from "../router/HostInfo";

export default class CardService {
    static async getDeckCards(userId, deckId) {
        const url = backendHost + `/decks/${deckId}/cards`
        const res = await axios.get(url, {
            headers: {
                "userId": userId
            }
        })
        return res.data;
    }

    static async createCard(userId, deckId, cardData) {
        // cardData: {front, back}
        const url = backendHost + `/decks/${deckId}/cards`
        const res = await axios.post(url, cardData, {
            headers: {
                "userId": userId
            }
        })

        return res.data;
    }

    static async getCard(userId, deckId, cardId) {
        const url = backendHost + `/decks/${deckId}/cards/${cardId}`
        const res = await axios.get(url, {
            headers: {
                "userId": userId
            }
        })
        return res.data;
    }

    static async updateCard(userId, deckId, cardId, cardData) {
        // cardData: {front, back}
        const url = backendHost + `/decks/${deckId}/cards/${cardId}`
        const res = await axios.put(url, cardData, {
            headers: {
                "userId": userId
            }
        })
        return res.data;
    }

    static async deleteCard(userId, deckId, cardId) {
        const url = backendHost + `/decks/${deckId}/cards/${cardId}`
        await axios.delete(url,{
            headers: {
                "userId": userId
            }
        })
    }
}
