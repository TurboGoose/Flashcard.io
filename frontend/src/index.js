import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {getConfig} from "./auth/Config";
import {frontendHost} from "./API/HostInfo";
import {Auth0Provider} from "@auth0/auth0-react";

const providerConfig = {
    ...getConfig(),
    redirectUri: frontendHost + "/decks",
};

ReactDOM.render(
    <Auth0Provider {...providerConfig}>
        <App />
    </Auth0Provider>,
    document.getElementById("root")
);
