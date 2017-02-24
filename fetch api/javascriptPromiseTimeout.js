/**
 * Created by mukadder on 2/24/17.
 */
//Taming timeouts with a Promise

(new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log("successfully resolving");
        resolve();
    }, 1000);
    setTimeout(function() {
        console.log("rejecting the promise");
        reject();
    }, 2000);
})).then(function () {
    console.log("Promise succeeded");
}, function () {
    console.log("Promise failed");
});

var toplevel = (new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log("successfully resolving");
        resolve();
    }, 5000);
    setTimeout(function() {
        console.log("first timeout, rejecting the promise");
        reject();
    }, 2000);
})).catch(function() {
    console.log("timed out ... retrying");
    /* at this point, we have timed out, try again and return a new promise which will take over the old one if it fails */
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, 2000);
        setTimeout(reject, 4000);
    });
});
toplevel.then(function () {
    console.log("[SUCCESS] Toplevel Promise succeeded");
}, function () {
    console.log("[FAIL] Toplevel Promise failed");
});
/*
 In addition, promises can be chained, which means that if when the promise is marked as complete (either successfully or as a failure) another promise is passed in as the value of completion, then this new promise effectively replaces the original one and its result will be passed seamlessly to any code that is waiting on the original promise. The upshot of this is that if you want to repeat the original action with a new (and potentially different) timeout, you can do so by intercepting the failure of the original promise, trying again, and then returning this new promise. If the new promise succeeds (that is, the second attempt to perform the action succeeded within the time limit), this will filter its way up to the top and result in a successful resolution of the original promise.
 */