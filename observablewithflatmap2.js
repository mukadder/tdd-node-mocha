/**
 * Created by mukadder on 3/9/17.
 */
import superagent from 'superagent';
import {Observable} from 'rx';

let apiUrl,
    inspireHTML,
    getInspiration,
    stopButtonId,
    stopGettingInspired;

apiUrl = `http://api.icndb.com/jokes/random?limitTo=[nerdy,explicit]`;

inspireHTML = (parentId, inspiration) => {
    let parentNode,
        inspirationalNode;

    parentNode = document.getElementById(parentId);
    inspirationalNode = document.createElement('p');
    inspirationalNode.innerHTML = inspiration;

    parentNode.insertBefore(inspirationalNode, parentNode.firstChild);
};

getInspiration = () => new Promise((resolve, reject) => {
    superagent
        .get(apiUrl)
        .end((err, res) => {
            if (err) {
                return reject(err);
            }

            let data,
                inspiration;

            data = JSON.parse(res.text);
            inspiration = data.value.joke;

            resolve(inspiration);
        });
});

stopButtonId = 'stop';

stopGettingInspired = Observable
    .fromEvent(document.getElementById(stopButtonId), 'click')
    .do((event) => event.preventDefault());

Observable
    .interval(2000)
    .takeUntil(stopGettingInspired)
    .flatMap(getInspiration)
    .subscribe({
        onNext: (inspiration) => {
            let parentId;

            parentId = `inspiration`;
            inspireHTML(parentId, inspiration);
        },
        onError: (error) => {
            console.error('Error while getting inspired', error);
        },
        onCompleted: () => {
            console.log('Done getting inspired!');
        },
    });
/*
 /* This is how we've been doing observer pattern */
document.addEventListener('mousemove', e => console.log(e.clientX));

/* This is how the new Observable looks like doing same thing */
Rx.Observable.fromEvent(document, 'mousemove')
    .subscribe(e => console.log(e.clientX));

/*
nter Observables, the shiniest new abstraction for javascript devs. In reality though, Observables are simply the observer pattern at work. We’ve been attaching listeners to DOM events and reacting to events since the big bang. That pattern got abstracted to make it possible to interact with basically all data flow using the observer pattern. The resulting interface (or class/prototype/thing whatever you want to call it) was named Observable. Fitting.
 * This is how we've been doing observer pattern */
document.addEventListener('mousemove', e => console.log(e.clientX));

/* This is how the new Observable looks like doing same thing */
Rx.Observable.fromEvent(document, 'mousemove')
    .subscribe(e => console.log(e.clientX));
x.Observable.range(1, 10)
    .subscribe(e => console.log(e));

const sub = Rx.Observable.interval(1000)
    .subscribe(e => doThisEverySecond());
setTimeout(()=> sub.dispose(), 3000);
/* Print 1 to 10 instantly then print a number every 2 seconds */
Rx.Observable.range(1, 10)
    .concat( Rx.Observable.interval(2000) )
    .subscribe(e => console.log(e));

/* Retry the Observable up to 2 times in case of error */
myHttpRequestObservable
    .retry(3) // 2 retries + 1 initial run
    .subscribe(e => console.log(e));

/* Print message if mouse moved within an area */
Rx.Observable.fromEvent(document, 'mousemove')
    .map(e => [e.clientX, e.clientY])
    .filter(e => isInArea(e)) // isInArea return boolean
    .subscribe(e => console.log('Mouse moved!'));
Observables in Angular 2
Angular 2 uses Rx.js Observables instead of promises for dealing with HTTP. This means, as we saw in the examples above, they come with some serious batteries included. That’s one of the reasons that HTTP operations in Angular 2 is so amazing. Here’s some code which consumes a quotes API via HTTP get. The result is an observable.

    export class App {
    qlist: String[] = [];

    constructor (public http: Http) {
}

getQuote () {
    return this.http.get('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1');
}
}
Note that since http.get method returns an Observable, merely calling the getQuote method won’t actually fire a request. An Observable starts emitting data when a subscriber is attached to it. Technically, this type of Observable is called a cold Observable. There’s also hot Observables that can emit data regardless of whether or not there are any subscriptions.

    Now that we’ve seen how a simple request observable is defined in Angular 2, let’s see some operators on it. A code snippet is worth a thousand words:
    class App {

        /* Existing methods … */

        addQuote () {
            this.getQuote()
                .retry(2) // in case of error, try 1 more time
                .repeat(3) // do this 3 times
                .map(res => res.json()) // convert response to json
                .filter(res => res.length > 0) // drop empty array responses
                .map(res => res[0].content.replace(/\<.*?\>/g, ''))
                .subscribe(quote => {
                    this.qlist.push(quote);
                }, e => console.log(e.message));
        }
    }
