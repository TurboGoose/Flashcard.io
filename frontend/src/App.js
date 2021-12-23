import {useEffect, useState} from "react";
import {AuthContext} from "./context";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {getConfig} from "./auth/Config";
import {frontendHost} from "./API/HostInfo";
import {Auth0Provider} from "@auth0/auth0-react";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState({userId: 0 , name: "", email: ""})

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setIsAuth(true)
        }
    }, [])

    const providerConfig = {
        ...getConfig(),
        redirectUri: frontendHost + "/decks",
    };


    // add Auth0 loading and error handling from tutorial

    return (
        <Auth0Provider {...providerConfig}>
            <AuthContext.Provider value={{
                user, setUser, isAuth, setIsAuth
            }}>
                <BrowserRouter>
                    <AppRouter/>
                </BrowserRouter>
            </AuthContext.Provider>
        </Auth0Provider>

  );
}

export default App;
