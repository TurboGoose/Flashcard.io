import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {useAuth0} from "@auth0/auth0-react";

const AppRouter = () => {
    const {isAuthenticated} = useAuth0();

    return (
        isAuthenticated
            ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        component={route.component}
                        exact={route.exact}
                        key = {route.path}
                    />
                )}
                <Redirect to={"/decks"}/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        component={route.component}
                        exact={route.exact}
                        key = {route.path}
                    />
                )}
                {/*<Redirect to={"/login"}/>*/}
            </Switch>
    );
};

export default AppRouter;