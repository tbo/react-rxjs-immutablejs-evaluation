

// export const updateCounter = new Rx.Subject()
// updateCounter
//     .withLatestFrom(appState, (value, state) => state.set('counter', state.get('counter') + value))
//     .subscribe(appState)
//
// export const updateUser = new Rx.Subject()
// updateUser
//     .withLatestFrom(appState, (value, state) => state.set('user', Immutable.fromJS(value.data)))
//     .subscribe(appState)
//
// export const updateRoute = new Rx.Subject()
// updateRoute
//     .withLatestFrom(Store, (value, state) => state.set('path', state.get('path') + 'path/'))
//     .subscribe(Store)

// var ajax = Rx.Observable.fromPromise(request.get('https://randomuser.me/api/'))
//     .withLatestFrom(Store, (response, state) => state.set('nationality', response.data.nationality))
// var source = ajax.merge(Rx.Observable.interval(3000).take(10))
//     .withLatestFrom(Store, (value, state) => state.set('autocounter', state.get('counter') + 1))
// source.subscribe(Store)
// source.subscribe(updateRoute);
// source.subscribe(updateCounter);
