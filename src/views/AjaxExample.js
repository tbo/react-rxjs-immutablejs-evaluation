import React, {Component} from 'react';
import Actions from '../Actions';

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>Ajax example</h1>
                <button onClick={Actions.loadQuote}>Load User</button>
                <pre>{this.props.route.ajaxMsg}</pre>
            </div>
        );
    }
}
