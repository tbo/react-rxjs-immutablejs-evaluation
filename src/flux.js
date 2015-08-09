import Rx from 'rx-lite';
import Immutable from 'seamless-immutable';

export class Store extends Rx.BehaviorSubject {
    constructor(properties) {
        super(Immutable(properties));
    }

    onCompleted() {/* keep alive */}
}

export class Action extends Rx.Subject {
    constructor(properties) {
        super();
        this.trigger = this.onNext.bind(this);
    }
}

export const appState = new Store({counter: 0});

Rx.Observable.prototype.asImmutable = function () {
    return this.map(value => Immutable(value));
}

Rx.Observable.prototype.asMutable = function (deep = true) {
    return this.map(value => value.asMutable({deep}));
}

Rx.Observable.prototype.log = function () {
    this.subscribe(next => console.log('[Stream]', next));
    return this;
}

Rx.Observable.prototype.setStore = function (reducer, store = appState) {
    this.withLatestFrom(store.asMutable(), reducer).asImmutable().subscribe(store);
    return this;
}

export {Rx};
