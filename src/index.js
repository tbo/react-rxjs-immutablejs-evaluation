import React from 'react';
import App from './App';
import {appState} from './flux';

function renderApp(state) {
    React.render(<App appState={state}/>, document.body);
}

appState.log();
appState.subscribe(state => renderApp(state));
