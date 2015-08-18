import React, {Component} from 'react';
import {Router, Route} from 'react-router';
import {history} from 'react-router/lib/BrowserHistory';
import CounterExample from './CounterExample';
import AjaxExample from './AjaxExample';
import Main from './Main';

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
