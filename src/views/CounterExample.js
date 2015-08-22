import React, {Component} from 'react';
import Actions from '../Actions';
import {onLoad} from '../flux';

@onLoad(Actions.incrementCounter)
export default class CounterPage extends Component {
    render() {
        return (
            <div>
                <h2>Counter Example</h2>
                <button onClick={Actions.incrementCounter}>Increment</button>
                <button onClick={Actions.decrementCounter}>Decrement</button>
                <div>{this.props.route.counter}</div>
            </div>
        );
    }
}
