/**
 * Created by mukadder http://alexandrekieling.com/javascript-promises-five-practical-examples/
 *
 * iming Out Long-running Operations

 An interesting trick we can do with promises is timing out long-running operations. All we need to do is invoke the Promise.race(iterable) with two promises: one from the main operation and one that rejects after some time. If the main operation completes before the timeout period, the next then is invoked with the result of the operation; if it doesn’t, the catch method is invoked.

 The example below sends a request to the Spotify API and times out in case the response doesn’t arrive in 500 milliseconds.

 on 2/24/17.
 */
var fetch = require('node-fetch');

var artistId = '711MCceyCBcFnzjGY4Q7Un';
var timeInMillis = 500;

Promise.race([
    fetchArtist(artistId),
    timeout(timeInMillis)
])
    .then(printResults)
    .catch(handleError);

function fetchArtist(artistId) {
    return fetch(`https://api.spotify.com/v1/artists/${artistId}`).then(response => response.json());
}

function timeout(timeInMillis) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), timeInMillis)
    });
}

function printResults(json) {
    console.log(json);
}

function handleError(err) {
    console.log(err);
}