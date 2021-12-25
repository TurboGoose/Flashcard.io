import React from 'react';
import {useHistory} from "react-router-dom";
import MyButton from "../button/MyButton";
import LogoutButton from "../../LogOutButton";
import {useAuth0} from "@auth0/auth0-react";

const MyNavbar = () => {
    const router = useHistory()
    const {user} = useAuth0()
    const {isAuthenticated} = useAuth0();

    return (
        <div className="navbar">
            {isAuthenticated &&
                <div>
                    <div>
                        <LogoutButton/>
                        <MyButton onClick={() => router.push("/decks")}>Decks</MyButton>
                    </div>
                    <h4 style={{float: "right"}}>{user.name}</h4>
                </div>
            }
        </div>
    );
};

export default MyNavbar;