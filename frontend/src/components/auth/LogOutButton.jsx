import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import Button from "../UI/button/Button";
import {frontendHost} from "../../router/HostInfo";

const LogoutButton = () => {
    const {logout, isAuthenticated} = useAuth0();

    const quit = event => {
        event.preventDefault()
        logout({returnTo: frontendHost + "/login"})
    }

    return isAuthenticated && (
        <Button onClick={quit}>
            Log Out
        </Button>
    );
};

export default LogoutButton;