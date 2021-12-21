import {useEffect, useState} from "react";
import {AuthContext} from "./context";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";

function App() {
    const [isAuth, setIsAuth] = useState(true)
    const [user, setUser] = useState({userId: 1, name: "", email: ""})

    useEffect(() => {
        setIsAuth(localStorage.getItem("auth"))
    }, [])

    return (
        <AuthContext.Provider value={{
            user, setUser, isAuth, setIsAuth
        }}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>

  );
}

export default App;
