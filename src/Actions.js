import {Action} from './flux'
import request from 'axios'

function updateCounter(value, state) {
    state.counter += value
    return state
}

export const incrementCounter = new Action()
incrementCounter
    .map(x => 1)
    .setStore(updateCounter)

export const decrementCounter = new Action()
decrementCounter
    .map(x => -1)
    .setStore(updateCounter)

export const loadQuote = new Action()
loadQuote
    .flatMap(() => Rx.Observable.fromPromise(request.get('/ajax-test-file.txt')))
    .pluck('data')
    .setStore((value, state) => {state.ajaxMsg = value; return state; })
