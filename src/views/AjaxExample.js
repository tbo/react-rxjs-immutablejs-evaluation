import React, {Component} from 'react';
import Actions from '../Actions';
import {onLoad} from '../flux';

@onLoad(Actions.incrementCounter)
export default class AjaxPage extends Component {
    render() {
        return (
            <div>
                <h1>Ajax example</h1>
                <button onClick={Actions.loadQuote}>Load User</button>
                <pre>{this.props.route.ajaxMsg.length}</pre>
            </div>
        );
    }
}
