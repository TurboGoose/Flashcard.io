import axios from "axios";
import {host} from "./HostInfo";

export default class LearningService {
    static async loadCardsToLearn(userId, deckId) {
        const url = host + `decks/${deckId}/learn`
        const res = await axios.get(url, {
            headers: {
                "userId": userId
            }
        })
        return res.data;
    }

    static async updateCard(userId, deckId, cardData) {
        const url = host + `decks/${deckId}/learn`
        const res = await axios.put(url, cardData, {
            headers: {
                "userId": userId
            }
        })
        return res.data
    }
}
