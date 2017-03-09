/**
 * Created by mukadder on 3/9/17.
 */

var superagent = require('superagent');
var Rx = require('rxjs/Rx');

Observable =require( 'rxjs/Observable');
let apiUrl,
    reactiveInspiration;

apiUrl = `http://api.icndb.com/jokes/random?limitTo=[nerdy,explicit]`;

reactiveInspiration = Rx.Observable.create((observer) => {
    /*
     Observable.create's callback is given an object as argument, which provides our three favorite methods: onNext, onError, and onCompleted.
     */
    superagent
        .get(apiUrl)
        .end((err, res) => {
            if (err) {
                return observer.onError(err);
            }
            let data,
                inspiration;
            data = JSON.parse(res.text);
            inspiration = data.value.joke;
            observer.next(inspiration);
            observer.complete();
        });
    /*
     The dark art of DOM-events can end up being pretty expensive if we forget to remove the event-listeners. So that's what we can release in this function.
     */
    return () => {
        console.log('Release the kraken!');
    };
});
/*
 f any error occurs in the Observable, it stops right there and will not emit any more values unless explicitly asked to do so. It also calls its dispose function when an Observable finishes. So it's guaranteed that an Observable's resources will get freed whenever it finishes, naturally or by error.

 That's all there is you need to know to get started with Observables. A Promise represents a single asynchronous value, like a regular variable. Observables on the other hand represents a series of asynchronous values, like an array.
 */
reactiveInspiration.subscribe(
    (inspiration) => {
        console.log('Inspiration: ', inspiration);
    },
    (error) => {
        console.error('Error while getting inspired', error);
    },
    () => {
        console.log('Done getting inspired!');
    }
);