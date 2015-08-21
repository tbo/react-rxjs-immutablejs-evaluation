import Rx from 'rx-lite';
import Immutable from 'immutable';

export class Store extends Rx.BehaviorSubject {
    constructor(properties) {
        super(Immutable.fromJS(properties));
    }

    set(properties) {
        this.onNext(Immutable.fromJS(properties));
    }

    onCompleted() {/* keep alive */}
}

export const appState = new Store({});

Rx.Observable.prototype.log = function () {
    return this.subscribe(next => console.log('[Stream]', next instanceof Immutable.Map ? next.toJS() : next));
}

Rx.Observable.prototype.setState = function setState(reducer, store = appState) {
    return this.withLatestFrom(store, reducer).subscribe(store);
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
