import {useState} from "react";
import {UserContext} from "./context";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import MyNavbar from "./components/UI/navbar/MyNavbar";

function App() {
    const [user, setUser] = useState({userId: 0 , name: "", email: ""})

    return (
        <UserContext.Provider value={{
            user, setUser
        }}>
            <BrowserRouter>
                <MyNavbar/>
                <AppRouter/>
            </BrowserRouter>
        </UserContext.Provider>
  );
}

export default App;
