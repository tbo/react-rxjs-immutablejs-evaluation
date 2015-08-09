import React, {Component} from 'react';
import {Router, Route, Link} from 'react-router';
import {history} from 'react-router/lib/BrowserHistory';
import CounterExample from './CounterExample';
import AjaxExample from './AjaxExample';
import Main from './Main';
import {appState} from './flux';
import {incrementCounter} from './Actions';

export default class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Route path="/" component={Main}>
                    <Route path="counter" component={CounterExample} counter={this.props.appState.counter}/>
                    <Route path="ajax" component={AjaxExample} ajaxMsg={this.props.appState.ajaxMsg}/>
                </Route>
            </Router>
        )
    }
}
