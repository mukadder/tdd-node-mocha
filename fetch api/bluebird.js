/**
 * Created by mukadder on 2/27/17.
 */
var Promise = require('bluebird');

var numbers = [];

function test(){
    for(var i=1; i <= 1000000; i++) {
        numbers.push(i);
    }

    return Promise.map(numbers, function(num) {

        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(Math.pow(num, 2));
            }, 200)
        })
    });
}

Promise
    .all(test())
    .then(function() {
        console.log('done');
    });
