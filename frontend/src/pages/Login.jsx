import React from 'react';
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogOutButton";

const Login = () => {
    return (
        <div>
            <h1>Log in page</h1>
            <LoginButton/>
            <LogoutButton/>
        </div>
    );
};

export default Login;