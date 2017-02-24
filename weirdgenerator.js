//generator function
const co = require('co')
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
co(getTweets())
//const p = getTweets()
//console.log(p.next())