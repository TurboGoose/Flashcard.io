import React from 'react';
import LoginButton from "../components/LoginButton";
import "../styles/Login.css"

const Login = () => {
    return (
        <div className={"login"}>
            <h1>Log in via Google</h1>
            <LoginButton/>
        </div>
    );
};

export default Login;