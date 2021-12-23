import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import MyButton from "./UI/button/MyButton";
import {frontendHost} from "../API/HostInfo";

const LogoutButton = () => {
    const {logout, isAuthenticated} = useAuth0();

    const quit = event => {
        event.preventDefault()
        logout({returnTo: frontendHost + "/login"})
    }

    return isAuthenticated && (
        <MyButton onClick={quit}>
            Log Out
        </MyButton>
    );
};

export default LogoutButton;