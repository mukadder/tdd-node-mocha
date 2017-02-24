//generator function
const co = require('co')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
const fetch = require('node-fetch')
function *generator () {
    var name = yield 'Barry';
    return name + ', says hello';
}

// iterator object
let iterator = generator();

console.log(iterator.next()); // { value: "Barry",  done: false }
console.log(iterator.next('Sue')); // { value: "Sue, says hello", done: true }
/**
 * Created by mukadder on 2/24/17.
 */
//  lets see how it works first nnext will start generator and make it pause at yield
// second next will move from yield onwards and assign a paased in parm and the n retuen

    // http://chrisbuttery.com/articles/synchronous-asynchronous-javascript-with-es6-generators/
    // this blog greatly talk s about the generators
let getTweets = function* () {
    let totalTweets = [];
    let data;

    // pause. On `iterator.next()` get the 1st tweet and carry on.
    data = yield fetch('https://api.myjson.com/bins/2qjdn');
    totalTweets.push(data);

    // pause. On `iterator.next()` get the 2nd tweet and carry on.
    data = yield fetch('https://api.myjson.com/bins/3zjqz');
    totalTweets.push(data);

    // pause. On `iterator.next()` get the 3rd tweet and carry on.
    data = yield fetch('https://api.myjson.com/bins/29e3f');
    totalTweets.push(data);

    // log the tweets
    console.log(totalTweets);
};
let getTweets2 = function* () {
    let totalTweets = [];
    let data;

    // pause. On `iterator.next()` get the 1st tweet and carry on.
    data = yield get('https://api.myjson.com/bins/2qjdn');
    totalTweets.push(data);

    // pause. On `iterator.next()` get the 2nd tweet and carry on.
    data = yield get('https://api.myjson.com/bins/3zjqz');
    totalTweets.push(data);

    // pause. On `iterator.next()` get the 3rd tweet and carry on.
    data = yield get('https://api.myjson.com/bins/29e3f');
    totalTweets.push(data);

    // log the tweets
    console.log(totalTweets);
};
//co(getTweets())
//const p = getTweets()
//console.log(p.next())
// Thunk can  be used instead of fetch
/*
 Currently, the get(url) doesn’t actually return anything.
 It makes a request and passes it to a callback.
 We need get(url) to return something back to the yield statement so we can store this value in an array.
 We need to turn get(url) into a Thunk.
 At it’s most basic form, a thunk is a function that returns a function.
 */
let get = function (url) {

    // return a function, passing in our callback
    return function (callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function() {
            let response = xhr.responseText;
            if(xhr.readyState != 4) return;
            if (xhr.status === 200) {
                callback(null, response);
            }
            else {
                callback(response, null);
            }
        };
        xhr.send();
    };
};

// create the iterator
var iterator1 = getTweets2();

// call the first yield (pauses)
let result = iterator1.next();

// our value the return function from get(url), so call it and pass in a callback
result.value(function(err, res){
    if (err) console.log('do something with this error', err);

    // get the response
    // We need to call next again and pass in the response to assign it back to a variable
    let result = iterator1.next(res);
    result.value(function(err, res){
        if (err) console.log('do something with this error', err);

        // get the response
        // We need to call next again and pass in the response to assign it back to a variable
        let result = iterator.next(res);
        result.value(function(err, res){
            if (err) console.log('do something with this error', err);

            // get the response
            // We need to call next again and pass in the response to assign it back to a variable
            let result = iterator1.next(res);
        })
    });
});

// A generator function runner
let runGenerator = function (generatorFunction) {

    // recursive next()
    let next = function (err, arg) {

        // if error - throw and error
        if (err) return it.throw(err);

        // cache it.next(arg) as result
        var result = it.next(arg);

        // are we done?
        if (result.done) return;

        // result.value should be our callback() function from the XHR request
        if (typeof result.value == 'function') {
            // call next() as the callback()
            result.value(next);
        }
        else {
            // if the response isn't a function
            // pass it to next()
            next(null, result.value);
        }
    }

    // create the iterator
    let it = generatorFunction();
    return next();
}

// intiliase and pass in a generator function
runGenerator(getTweets);