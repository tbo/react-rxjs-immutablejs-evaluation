import React, {Component} from 'react';
import {incrementCounter, decrementCounter} from './Actions';

export default class App extends Component {
    render() {
        return (
            <div>
                <h2>Counter Example</h2>
                <button onClick={incrementCounter.trigger}>Increment</button>
                <button onClick={decrementCounter.trigger}>Decrement</button>
                <div>{this.props.route.counter}</div>
            </div>
        );
    }
}
