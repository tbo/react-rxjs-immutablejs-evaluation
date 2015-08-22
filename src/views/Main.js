import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Rx, onLoad} from '../flux';
import Actions from '../Actions';
import Immutable from 'immutable';

let prevLoadActions = [];
let actionTrigger = new Rx.Subject();

function onLoadHook(nextState, transition, callback) {
    let loadActions = nextState.branch
        .map(item => item.component.onLoad)
        .filter(onLoad => onLoad)
    let newLoadActions = loadActions
        .filter((onLoad, index) => onLoad !== prevLoadActions[index])
        .map(onLoad => onLoad(actionTrigger).take(1));

    prevLoadActions = loadActions;

    if (newLoadActions.length > 1) {
        Rx.Observable.zip(...newLoadActions).take(1).subscribe(() => callback());
        actionTrigger.onNext();
    } else if (newLoadActions.length === 1) {
        newLoadActions[0].take(1).subscribe(() => callback());
        actionTrigger.onNext();
    } else {
        callback();
    }
}

export default class App extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentWillMount() {
        this.context.router.addTransitionHook(onLoadHook);
    }

    render() {
        return (
            <div>
                <h1>Main</h1>
                <nav>
                    <Link to="/counter">Counter Example</Link>
                    |
                    <Link to="/ajax">Ajax Example</Link>
                </nav>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}
