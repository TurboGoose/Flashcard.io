import React, {useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";
import LogoutButton from "../../LogOutButton";

const MyNavbar = () => {
    const router = useHistory()
    const {isAuth} = useContext(AuthContext)

    return (
        <div className="navbar">
            {isAuth &&
                <div>
                    <LogoutButton/>
                    <MyButton onClick={() => router.push("/decks")}>Decks</MyButton>
                </div>
            }
        </div>
    );
};

export default MyNavbar;