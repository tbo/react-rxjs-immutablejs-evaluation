import React from 'react';
import App from './views/App';
import {appState} from './flux';
require("babel/polyfill");

function renderApp(state) {
    React.render(<App appState={state}/>, document.body);
}

appState.log();
appState.subscribe(state => renderApp(state));
