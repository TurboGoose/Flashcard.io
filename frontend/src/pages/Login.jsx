import React, {useContext} from 'react';
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogOutButton";
import {AuthContext} from "../context";
import {useAuth0} from "@auth0/auth0-react";
import UserService from "../API/UserService";

const Login = () => {
    const {user: externalUser} = useAuth0()
    const {isAuth, user, setUser} = useContext(AuthContext)

    const loadAndSaveUser = () => {
        console.log(externalUser)
        if (!isAuth) {
            return
        }
        // const newUser = {...user, name: externalUser.name, email: externalUser.email}
        // const loadedUser = UserService.createUser(newUser)
        // console.log(loadedUser)
        // setUser(loadedUser)
    }

    return (
        <div>
            <h1>Log in page</h1>
            <LoginButton onClick={loadAndSaveUser}/>
        </div>
    );
};

export default Login;