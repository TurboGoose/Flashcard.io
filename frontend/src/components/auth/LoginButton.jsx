import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import Button from "../UI/button/Button";

const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    const login = event => {
        event.preventDefault()
        loginWithRedirect()
    }

    return !isAuthenticated && (
        <Button onClick={login}>
            Log In
        </Button>
    );
};

export default LoginButton;