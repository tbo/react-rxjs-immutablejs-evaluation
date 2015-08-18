import Rx from 'rx-lite';
import Immutable from 'seamless-immutable';

export class Store extends Rx.BehaviorSubject {
    constructor(properties) {
        super(Immutable(properties));
    }

    set(properties) {
        this.onNext(Immutable(properties));
    }

    onCompleted() {/* keep alive */}
}

export const appState = new Store({});

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

export function action(target, key, descriptor) {
    let action = descriptor.value;
    let inputStream = new Rx.Subject();
    let outputStream = action.call(target, inputStream);
    descriptor.value = function actionDecorator(arg) {
        if (arg instanceof Rx.Observable) {
            return action.call(target, arg);
        }
        inputStream.onNext(arg);
        return outputStream;
    };
    return descriptor;
}
