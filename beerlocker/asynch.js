var async = require('async');

var square = function (num, doneCallback) {
    console.log(num * num);
    // Nothing went wrong, so callback with a null error.
    return doneCallback(null);
};

// Square each number in the array [1, 2, 3, 4]
async.each([1, 2, 3, 4], square, function (err) {
    // Square has been called on each of the numbers
    // so we're now done!
    console.log("Finished!");
});/**
 * Created by mukadder on 2/23/17.
 */
var square = function (num, doneCallback) {
        // Call back with no error and the result of num * num
        return doneCallback(null, num * num);
    };

// Square each number in the array [1, 2, 3, 4]
async.map([1, 2, 3, 4], square, function (err, results) {
    // Square has been called on each of the numbers
    // so we're now done!
    console.log("Finished!");
    console.log(results);
});

var square = function (num, doneCallback) {
    setTimeout(function () {
        console.log('Squaring', num);
        // A random amount of time has passed.
        // Callback with no error and the result of num * num
        return doneCallback(null, num * num);
    }, 4000 * Math.random());
};

// Square each number in the array [1, 2, 3, 4]
async.map([1, 2, 3, 4], square, function (err, results) {
    // Square has been called on each of the numbers
    // so we're now done!
    console.log("Finished!");
    console.log(results);
});

// Because the callbacks are asynchronous, this line
// is called before the finished callback.
console.log("This line happens first!");
