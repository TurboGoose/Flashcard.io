import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext)

    return (
        isAuth
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
                <Redirect to={"/login"}/>
            </Switch>
    );
};

export default AppRouter;