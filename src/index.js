import React from 'react';
import App from './views/App';
import {appState} from './flux';
import Actions from './Actions';

function renderApp(state) {
    React.render(<App appState={state}/>, document.body);
}

appState.log();
Actions.initializeStore();
appState.subscribe(state => renderApp(state));
