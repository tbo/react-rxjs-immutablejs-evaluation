import React, {Component} from 'react';
import {loadQuote} from './Actions';

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>Ajax example</h1>
                <button onClick={loadQuote.trigger}>Load User</button>
                <pre>{this.props.route.ajaxMsg}</pre>
            </div>
        );
    }
}
