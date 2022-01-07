import React from 'react';
import {useHistory} from "react-router-dom";
import MyButton from "../button/MyButton";
import LogoutButton from "../../LogOutButton";
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
                    <MyButton onClick={() => router.push("/decks")}>Decks</MyButton>
                    <h4>{user.name}</h4>
                    <LogoutButton/>
                </div>
            }
        </div>
    );
};

export default Navbar;