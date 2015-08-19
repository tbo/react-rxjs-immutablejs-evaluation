import React from 'react';
import App from './views/App';
import {appState} from './flux';

var changedState = null;

function renderApp() {
    if (changedState) {
        React.render(<App appState={changedState}/>, document.body);
        changedState = null;
    }
    window.requestAnimationFrame(renderApp);
}

appState.log();
appState.set({counter: 0});
appState.subscribe(state => {changedState = state});
window.requestAnimationFrame(renderApp);
