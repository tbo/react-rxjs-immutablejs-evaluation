import React from 'react';
import App from './views/App';
import {appState} from './flux';

function renderApp(state) {
    React.render(<App appState={state}/>, document.body);
}

appState.log();
appState.set({counter: 0});
appState.subscribe(state => renderApp(state));
