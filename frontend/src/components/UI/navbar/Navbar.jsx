import React from 'react';
import {useHistory} from "react-router-dom";
import Button from "../button/Button";
import LogoutButton from "../../auth/LogOutButton";
import {useAuth0} from "@auth0/auth0-react";
import classes from "./Navbar.module.css"

const Navbar = () => {
    const router = useHistory()
    const {user} = useAuth0()
    const {isAuthenticated} = useAuth0();

    return (
        <div className={classes.navbar_common}>
            {isAuthenticated &&
                <div className={classes.navbar}>
                    <Button onClick={() => router.push("/decks")}>Decks</Button>
                    <h4>{user.name}</h4>
                    <LogoutButton/>
                </div>
            }
        </div>
    );
};

export default Navbar;