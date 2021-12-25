import axios from "axios";
import {backendHost} from "../router/HostInfo";

export default class LearningService {
    static async loadCardsToLearn(accessToken, deckId) {
        const url = backendHost + `/decks/${deckId}/learn`
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data;
    }

    static async updateCard(accessToken, deckId, cardData) {
        const url = backendHost + `/decks/${deckId}/learn`
        const res = await axios.put(url, cardData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    }
}
