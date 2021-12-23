import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MyLoader from "../loader/MyLoader";
function Wrapper({ children }) {
    const {isLoading, error} = useAuth0();

    if (isLoading) {
        return <MyLoader/>;
    }
    if (error) {
        return <div>Oops... {error.message}</div>;
    }
    return <>{children}</>;
}
export default Wrapper;