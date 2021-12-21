import React, {useContext} from 'react';
import MyButton from "../components/UI/button/MyButton";

const Login = () => {
    const {setAuth} = useContext(AuthContext)

    const login = event => {
        event.preventDefault()
        setAuth(true)
        localStorage.setItem("auth", "true")
    }

    return (
        <div>
            {/*log in via Oauth2 here*/}
            <h1>Log in page</h1>
            <MyButton onClick={login}/>
        </div>
    );
};

export default Login;