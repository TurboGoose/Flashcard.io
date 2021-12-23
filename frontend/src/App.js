import {useEffect, useState} from "react";
import {AuthContext} from "./context";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import MyNavbar from "./components/UI/navbar/MyNavbar";

function App() {
    console.log(useAuth0().isAuthenticated)
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState({userId: 0 , name: "", email: ""})

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setIsAuth(true)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user, setUser, isAuth, setIsAuth
        }}>
            <BrowserRouter>
                <MyNavbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>

  );
}

export default App;
