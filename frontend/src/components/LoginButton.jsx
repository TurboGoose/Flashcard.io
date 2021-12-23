import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import MyButton from "./UI/button/MyButton";

const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    const login = event => {
        event.preventDefault()
        loginWithRedirect()
    }

    return !isAuthenticated && (
        <MyButton onClick={login}>
            Log In
        </MyButton>
    );
};

export default LoginButton;