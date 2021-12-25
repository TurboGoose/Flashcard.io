import axios from "axios";
import {backendHost} from "../router/HostInfo";

export default class CardService {
    static async getDeckCards(accessToken, deckId) {
        const url = backendHost + `/decks/${deckId}/cards`
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data;
    }

    static async createCard(accessToken, deckId, cardData) {
        // cardData: {front, back}
        const url = backendHost + `/decks/${deckId}/cards`
        const res = await axios.post(url, cardData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return res.data;
    }

    static async getCard(accessToken, deckId, cardId) {
        const url = backendHost + `/decks/${deckId}/cards/${cardId}`
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data;
    }

    static async updateCard(accessToken, deckId, cardId, cardData) {
        // cardData: {front, back}
        const url = backendHost + `/decks/${deckId}/cards/${cardId}`
        const res = await axios.put(url, cardData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data;
    }

    static async deleteCard(accessToken, deckId, cardId) {
        const url = backendHost + `/decks/${deckId}/cards/${cardId}`
        await axios.delete(url,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }
}
