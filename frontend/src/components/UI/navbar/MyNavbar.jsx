import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const MyNavbar = () => {
    const {setAuth} = useContext(AuthContext)

    const logout = () => {
        setAuth(false)
        localStorage.removeItem("auth")
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>Log out</MyButton>
            <div className="navbar__links">
                <Link to="/about">About site</Link>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
    );
};

export default MyNavbar;