import React from 'react';
import LoginButton from "../components/auth/LoginButton";
import "../styles/pages/Login.css"

const Login = () => {
    return (
        <div className={"login"}>
            <h1>Log in via Google</h1>
            <LoginButton/>
        </div>
    );
};

export default Login;