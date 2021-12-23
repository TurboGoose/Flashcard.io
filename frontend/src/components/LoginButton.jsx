import React, {useContext} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MyButton from "./UI/button/MyButton";
import {AuthContext} from "../context";

const LoginButton = ({onClick}) => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    const {setIsAuth} = useContext(AuthContext)

    const login = event => {
        event.preventDefault()
        loginWithRedirect()
        setIsAuth(isAuthenticated)
        localStorage.setItem("auth", String(isAuthenticated))
        onClick()
    }

    return (
        <MyButton onClick={login}>
            Log In
        </MyButton>
    );
};

export default LoginButton;