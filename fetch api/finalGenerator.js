var Async = require('async');

var numbers = [];

function test(){
    for(var i=1; i <= 1000000; i++) {
        numbers.push(i);
    }

    Async.map(numbers, function(num, callback) {
        setTimeout(function() {
            callback(Math.pow(num, 2));
        }, 200);
    }, function(err, result) {
        console.log('done');
    })
}

test();