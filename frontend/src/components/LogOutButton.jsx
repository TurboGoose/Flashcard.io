import React, {useContext} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MyButton from "./UI/button/MyButton";
import {frontendHost} from "../API/HostInfo";
import {AuthContext} from "../context";

const LogoutButton = () => {
    const {logout} = useAuth0();
    const {setIsAuth} = useContext(AuthContext)

    const quit = event => {
        event.preventDefault()
        logout({returnTo: frontendHost + "/login"})
        setIsAuth(false)
        localStorage.removeItem("auth")
    }

    return (
        <MyButton onClick={quit}>
            Log Out
        </MyButton>
    );
};

export default LogoutButton;