import React, {Component} from 'react';
import {Router5, RouteNode} from 'router5';
import {history} from 'react-router/lib/BrowserHistory';
import CounterExample from './CounterExample';
import AjaxExample from './AjaxExample';
import Main from './Main';
import {appState} from '../flux';
import {incrementCounter} from '../Actions';
import 'babel/polyfill';
import autobind from 'autobind-decorator';
import cloneWithProps from "react/lib/cloneWithProps";

var router = new Router5().setOption('useHash', false).start();


@autobind
class Route extends Component {
    static get defaultProps() {
        return {parentRouteNode: router.rootNode};
    }

    constructor(props) {
        super(props);
        this.state = {active: false};
    }

    setActiveState(toState, fromState) {
        if (toState.name === this.props.name) {
            this.setState({active: true});
        }
        if (fromState && fromState.name === this.props.name) {
            this.setState({active: false});
        }
    }

    componentWillMount() {
        this.routeNode = new RouteNode(this.props.name, this.props.path);
        this.props.parentRouteNode.add(this.routeNode);
        // router.addNode(this.props.name, this.props.path);
        router.addListener(this.setActiveState);
    }

    getChildRoutes() {
        return React.Children.map(
            this.props.children,
            child => cloneWithProps(child, {parentRouteNode: this.routeNode})
        );
    }

    render() {
        console.log(this.props.parentRouteNode, this.props);
        var Handler = this.props.component;
        return (<Handler {...this.props} {...this.state}>{this.getChildRoutes()}</Handler>);
    }
}

class TestElement extends Component {
    render() {
        return (
            <div>
                <div onClick={() => router.navigate(this.props.name)}>
                    {this.props.name} {this.props.active ? 'active' : 'inactive'}
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default class App extends Component {
    render() {
        return (
            <div>
                <Route name='counter' path='counter' component={TestElement}>
                    <Route name='counter.edit' path='edit' component={TestElement}/>
                </Route>
                <Route name='ajax' path='ajax' component={TestElement}/>
            </div>
        )
    }
}

            // <Router history={history}>
            //     <Route path="/" component={Main}>
            //         <Route path="counter" component={CounterExample} counter={this.props.appState.counter}/>
            //         <Route path="ajax" component={AjaxExample} ajaxMsg={this.props.appState.ajaxMsg}/>
            //     </Route>
            // </Router>
