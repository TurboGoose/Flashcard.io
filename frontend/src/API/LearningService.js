import axios from "axios";
import {backendHost} from "./HostInfo";

export default class LearningService {
    static async loadCardsToLearn(userId, deckId) {
        const url = backendHost + `decks/${deckId}/learn`
        const res = await axios.get(url, {
            headers: {
                "userId": userId
            }
        })
        return res.data;
    }

    static async updateCard(userId, deckId, cardData) {
        const url = backendHost + `decks/${deckId}/learn`
        const res = await axios.put(url, cardData, {
            headers: {
                "userId": userId
            }
        })
        return res.data
    }
}
