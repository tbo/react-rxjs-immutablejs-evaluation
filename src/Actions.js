import {action} from './flux'
import request from 'axios'

function updateCounter(value, state) {
    state.counter += value
    return state
}

export default {
    @action
    incrementCounter(observable) {
        return observable.map(x => 1).setStore(updateCounter)
    },

    @action
    decrementCounter(observable) {
        return observable.map(x => -1).setStore(updateCounter)
    },

    @action
    loadQuote(observable) {
        return observable
            .flatMap(() => Rx.Observable.fromPromise(request.get('/ajax-test-file.txt')))
            .pluck('data')
            .setStore((value, state) => {state.ajaxMsg = value; return state; });
    }
}
