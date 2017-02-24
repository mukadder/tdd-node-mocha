const fetch = require('node-fetch')
var MAX_WAITING_TIME = 5000;// in ms

/* @returns {wrapped Promise} with .resolve/.reject/.catch methods */
// It goes against Promise concept to not have external access to .resolve/.reject methods, but provides more flexibility
var getWrappedPromise = function () {
    var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
            wrappedPromise.resolve = resolve;
            wrappedPromise.reject = reject;
        });
    wrappedPromise.then = promise.then.bind(promise);
    wrappedPromise.catch = promise.catch.bind(promise);
    wrappedPromise.promise = promise;// e.g. if you want to provide somewhere only promise, without .resolve/.reject/.catch methods
    return wrappedPromise;
};
var processStatus = function (response) {
    // status "0" to handle local files fetching (e.g. Cordova/Phonegap etc.)
    if (response.status === 200 || response.status === 0) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
};
var parseJson = function (response) {
    return response.json();
};

/* @returns {wrapped Promise} with .resolve/.reject/.catch methods */
var getWrappedFetch = function () {
    var wrappedPromise = getWrappedPromise();
    var args = Array.prototype.slice.call(arguments);// arguments to Array

    fetch.apply(null, args)// calling original fetch() method
        .then(function (response) {
            wrappedPromise.resolve(response);
        }, function (error) {
            wrappedPromise.reject(error);
        })
        .catch(function (error) {
            wrappedPromise.catch(error);
        });
    return wrappedPromise;
};

/**
 * Fetch JSON by url
 * @param { {
 *  url: {String},
 *  [cacheBusting]: {Boolean}
 * } } params
 * @returns {Promise}
 */
var getJSON = function (params) {
    var wrappedFetch = getWrappedFetch(
        params.cacheBusting ? params.url + '?' + new Date().getTime() : params.url,
        {
            method: 'get',// optional, "GET" is default value
            headers: {
                'Accept': 'application/json'
            }
        });

    var timeoutId = setTimeout(function () {
        wrappedFetch.reject(new Error('Load timeout for resource: ' + params.url));// reject on timeout
    }, MAX_WAITING_TIME);

    return wrappedFetch.promise// getting clear promise from wrapped
        .then(function (response) {
            clearTimeout(timeoutId);
            return response;
        })
        .then(processStatus)
        .then(parseJson);
};

/*--- TEST  --*/
var url = 'https://api.github.com/users/malyw';
var onComplete = function () {
    console.log('I\'m invoked in any case after success/error');
};

getJSON({
    url: url,
    cacheBusting: true
}).then(function (data) {// on success
    console.log('JSON parsed successfully!');
    console.log(data);
    onComplete(data);
}, function (error) {// on reject
    console.error('An error occured!');
    console.error(error.message ? error.message : error);
    onComplete(error);
});