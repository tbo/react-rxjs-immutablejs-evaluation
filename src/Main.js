import React, {Component} from 'react';
import {Link} from 'react-router';
import {test} from './Actions';

export default class App extends Component {
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
