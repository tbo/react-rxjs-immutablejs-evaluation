import {action} from './flux';
import request from 'axios';

function updateCounter(value, state) {
    return state.set('counter', state.get('counter') + value);
}

export default {
    @action
    incrementCounter(observable) {
        return observable.map(x => 1).setState(updateCounter);
    },

    @action
    decrementCounter(observable) {
        return observable.map(x => -1).setState(updateCounter);
    },

    @action
    loadQuote(observable) {
        return observable
            .flatMap(() => Rx.Observable.fromPromise(request.get('/ajax-test-file.txt')))
            .pluck('data')
            .setState((value, state) => state.set('ajaxMsg', value));
    }
}
