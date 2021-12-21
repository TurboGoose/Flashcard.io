import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetch = async () => {
        try {
            setLoading(true)
            await callback()
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    return [fetch, isLoading, error]
}