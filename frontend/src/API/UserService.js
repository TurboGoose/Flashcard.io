import {backendHost} from "./HostInfo";
import axios from "axios";

export default class UserService {
    static async createUser(userData) {
        const url = backendHost + "users"
        const res = await axios.post(url, userData)
        return res.data;
    }
}