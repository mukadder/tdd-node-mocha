/**
 * Created by mukadder on 3/9/17.
 */
var superagent = require('superagent');
var Rx = require('rxjs/Rx');

Observable =require( 'rxjs/Observable');

let apiUrl,
    inspireHTML,
    reactiveInspirations;

apiUrl = `http://api.icndb.com/jokes/random?limitTo=[nerdy,explicit]`;

inspireHTML = (parentId, inspiration) => {
    let parentNode,
        inspirationalNode;

    parentNode = document.getElementById(parentId);
    inspirationalNode = document.createElement('p');
    inspirationalNode.innerHTML = inspiration;

    parentNode.insertBefore(inspirationalNode, parentNode.firstChild);
};


reactiveInspirations = Rx.Observable.create((observer) => {
    let interval,
        maxTries,
        tries;

    maxTries = 10;
    tries = 0;

    interval = setInterval(() => {
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
                console.log('Inspiration has arrived!');
                observer.next(inspiration);

            });

        if (tries < maxTries) {
            tries++;
        } else {
            observer.complete();
        }
    }, 2000);

    return () => {
        console.log('Releasing the Kraken!');
        clearInterval(interval);
    };
});
// remove take 5
/*
 Charanjit Singh
 March 02nd, 2016



 In the first post of this series we saw how RxJS Observables are similar in use to Promises and we covered how powerful they are. In this post we'll experience the power Observables bring to the table.

 Now, as if our little app wasn't inspirational enough, we want to overload it with inspiration. Instead of 1, we want to show 10 Chuck Norris inspirations one by one, with a delay of 2 seconds each. Let's implement that with Promises first:

 Promise

 JsBin: http://jsbin.com/wupoya/1/edit?js,output
 import superagent from 'superagent';

 let apiUrl,
 inspireHTML,
 addPromiscuousInspiration,
 add10Inspirations;

 apiUrl = `http://api.icndb.com/jokes/random?limitTo=[nerdy,explicit]`;

 inspireHTML = (parentId, inspiration) => {
 let parentNode,
 inspirationalNode;

 parentNode = document.getElementById(parentId);
 inspirationalNode = document.createElement('p');
 inspirationalNode.innerHTML = inspiration;

 parentNode.insertBefore(inspirationalNode, parentNode.firstChild);
 };

 addPromiscuousInspiration = () => {
 let promiscuousInspiration;

 promiscuousInspiration = new Promise((resolve, reject) => {
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

 console.log('Inspiration has arrived!');
 return resolve(inspiration);
 });
 });

 promiscuousInspiration.then((inspiration) => {
 let parentId;

 parentId = `inspiration`;
 inspireHTML(parentId, inspiration);
 }, (err) => {
 console.error('Error while getting inspired: ', err);
 });
 };

 add10Inspirations = () => {
 let maxTries,
 tries,
 interval;

 maxTries = 10;
 tries = 1;

 interval = setInterval(() => {
 addPromiscuousInspiration();

 if (tries < maxTries) {
 tries++;
 } else {
 clearInterval(interval);
 }
 }, 2000);
 };

 add10Inspirations();
 Note: From now on we are injecting inspirations into HTML (as you'd have guessed from the code). So keep the ES6/Babel and Output panels open in JsBin

 Well there, we solved the problem. The code is convoluted, but it is just plain JavaScript we already know, so I am not going to explain it step-by-step.

 Let's try to implement the same using Observable.

 Observable

 JsBin: http://jsbin.com/wupoya/3/edit?js,output
 import superagent from 'superagent';
 import {Observable} from 'rx';

 let apiUrl,
 inspireHTML,
 reactiveInspirations;

 apiUrl = `http://api.icndb.com/jokes/random?limitTo=[nerdy,explicit]`;

 inspireHTML = (parentId, inspiration) => {
 let parentNode,
 inspirationalNode;

 parentNode = document.getElementById(parentId);
 inspirationalNode = document.createElement('p');
 inspirationalNode.innerHTML = inspiration;

 parentNode.insertBefore(inspirationalNode, parentNode.firstChild);
 };


 reactiveInspirations = Observable.create((observer) => {
 let interval,
 maxTries,
 tries;

 maxTries = 10;
 tries = 0;

 interval = setInterval(() => {
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

 observer.onNext(inspiration);
 });

 if (tries < maxTries) {
 tries++;
 } else {
 observer.onCompleted();
 }
 }, 2000);

 return () => {
 console.log('Releasing the Kraken!');
 clearInterval(interval);
 };
 });

 reactiveInspirations.subscribe({
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
 Easter Egg: There is a tiny little easter egg in this code. Try find it if you want some candy! Hint: Observable can stop right when asked to.

 There are better ways of doing this (and we'll use them later), but to try comparing apples to apples I took the same approach as Promises. We'll use an interval that makes a call to the server and gets us an inspiration. You may have noticed some major differences. The consumer of our Observable (subscriber) is not changed at all, it is still assuming the same thing it was earlier. And that is a big thing. The only change we made is in the creation of our Observable. Earlier we would create a single value and called it completed, but now we set an interval and emit values making an Ajax request every 2 seconds.

 Take another look at how we have written the Observable creator. Notice how we are clearing the interval we set up. We put the code responsible for clearing the interval in the dispose method, because its responsibility is to release resources. And then when we have made 10 requests, we simply execute onCompleted and all the resources that need to be cleared (the interval in this case) are released. If you still can't see the power this declarative way of disposing resources brings, let's assume another case. Assume you are the consumer (subscriber) of this observable, and now you want only five inspirations. But you can't change the implementation of the Observable. How would you go about it? We can go around counting the inspirations and ignore that after we've received five, but that means we waste five requests.

 We want to make only five requests to the server, and then we want to stop the interval and make no more requests. We can actually do that without making a single change to how the Observable is created. When we do a reactiveInspiration.subscribe, it returns us a Disposable object. We can call reactiveInspiration.subscribe(...).dispose() any time to stop the Observable right there and release all its resources. Turns out there are many such use cases which come up more than often when you're dealing with streams/collections of asynchronous operations. RxJS provides very nice API to deal with a lot of them. Instead of manually counting the number of items emitted by our Observable and then disposing it, we can use Observable.prototype.take operator. Observable.prototype.take takes a number as input, and call dispose on the Observable after it has emitted that many values. Here we go:

 JsBin: http://jsbin.com/wupoya/4/edit?js,output
 reactiveInspirations
 .take(5)
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
 If you notice in the console, you would see Releasing the Kraken! logged after five inspirations, and no more requests will be made to the server. take is one of the many operators available on the Observable that we can use to declaratively manipulate asynchronous collections
 */
reactiveInspirations.take(5).subscribe({
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