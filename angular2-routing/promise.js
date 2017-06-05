/**
 * Created by mukadder on 3/16/17.
 */
const p = new Promise((resolve, reject) => {
    // executor will immediately throw an exception, forcing
    // a reject
    throw 123;
})
    .then(
        // child promise resolved handler
        data => console.log('resolved', data),
        // child promise rejected handler
        data => console.log('rejected', data));

// "rejected", 123

var successHandler = (val) => {
    console.log(val);
    return val+1;
};

var p2 = new Promise((resolve, reject) => { resolve(0); })
    .then(successHandler)
    .then(successHandler)
    .then(successHandler);

// 0
// 1
// 2
var cancel;
const cancelPromise = new Promise((resolve, reject) => {
    cancel = reject;
});
const delayedPromise = new Promise((resolve, reject) =>
    setTimeout(resolve.bind(null, 'foobar'), 3000))
    .then(() => console.log('still resolved!'));

Promise.race([ cancelPromise, delayedPromise ])
    .then(
        val => console.log(val),
        () => console.error('cancelled!'));

cancel();
// (error) cancelled!

// After 3 seconds elapses
// "still resolved!"