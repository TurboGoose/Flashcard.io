import {useEffect, useState} from "react";
import DeckFilter from "./components/DeckFilter";
import LearningService from "./api/LearningService";
import {AuthContext} from "./context";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";

function App() {
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState({id: 0, name: "", email: ""})

    useEffect(() => {
        setAuth(localStorage.getItem("auth"))
    }, [])

    return (
        <AuthContext.Provider value={{
            user, setUser, auth, isAuth: setAuth
        }}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>

  );
}

export default App;
